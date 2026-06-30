import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { EventEmitter } from "node:events";
import { build } from "esbuild";

const tempDir = mkdtempSync(join(tmpdir(), "lead-delivery-"));
const bundlePath = join(tempDir, "telegram-brief.mjs");

await build({
  entryPoints: [join(process.cwd(), "api/telegram-brief.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node22",
  outfile: bundlePath,
  logLevel: "silent",
});

const { default: handler } = await import(pathToFileURL(bundlePath));

process.env.TELEGRAM_BOT_TOKEN = "telegram-token";
process.env.TELEGRAM_CHAT_ID = "telegram-chat";
process.env.SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/test/exec";
process.env.SHEETS_WEBHOOK_SECRET = "sheet-secret";

const payload = {
  contacts: {
    name: "Мария",
    preferredContact: "Telegram",
    phone: "",
    telegram: "@maria",
  },
  service: "automation",
  startFormat: "Нужен быстрый запуск",
  answers: {
    currentProcess: "Заявки вручную копируются из сайта в чат",
    services: "Telegram, Google Sheets, сайт",
    triggers: "Новая заявка",
    actions: "Отправить уведомление и добавить строку",
    exceptions: "Если таблица недоступна, показать ошибку",
    reporting: "Нужен список источников",
  },
  comment: "Проверить UTM",
  source: {
    formType: "smart_brief",
    pageUrl: "https://sborkai.ru/?utm_source=tg&utm_medium=social&utm_campaign=launch",
    referrer: "https://t.me/sborkai",
    utmSource: "tg",
    utmMedium: "social",
    utmCampaign: "launch",
  },
};

const invokeHandler = async (body) => new Promise((resolve) => {
  const req = new EventEmitter();
  req.method = "POST";
  req.body = body;
  const res = {
    statusCode: 200,
    headers: {},
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    end(body) {
      resolve({
        statusCode: this.statusCode,
        headers: this.headers,
        body: body ? JSON.parse(body) : null,
      });
    },
  };

  handler(req, res);
});

const calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url: String(url), init });
  return {
    ok: true,
    json: async () => ({ ok: true }),
  };
};

const response = await invokeHandler(payload);

if (response.statusCode !== 200 || response.body?.ok !== true) {
  throw new Error(`Expected successful response, got ${response.statusCode} ${JSON.stringify(response.body)}`);
}

if (calls.length !== 2) {
  throw new Error(`Expected Telegram and Sheets delivery calls, got ${calls.length}`);
}

const telegramCall = calls.find((call) => call.url.includes("api.telegram.org"));
const sheetsCall = calls.find((call) => call.url === process.env.SHEETS_WEBHOOK_URL);

if (!telegramCall) {
  throw new Error("Missing Telegram delivery call");
}

if (!sheetsCall) {
  throw new Error("Missing Google Sheets webhook delivery call");
}

const telegramBody = JSON.parse(telegramCall.init.body);
if (telegramBody.chat_id !== "telegram-chat" || !telegramBody.text.includes("Заявка Sborkai")) {
  throw new Error("Telegram payload is missing the chat id or brief text");
}

const sheetsBody = JSON.parse(sheetsCall.init.body);
const row = sheetsBody.row;

if (sheetsBody.secret !== "sheet-secret") {
  throw new Error("Sheets webhook payload must include the server-side shared secret");
}

const expectedRowValues = {
  form_type: "smart_brief",
  name: "Мария",
  preferred_contact: "Telegram",
  phone: "",
  telegram: "@maria",
  service: "automation",
  start_format: "Нужен быстрый запуск",
  comment: "Проверить UTM",
  page_url: payload.source.pageUrl,
  referrer: payload.source.referrer,
  utm_source: "tg",
  utm_medium: "social",
  utm_campaign: "launch",
};

for (const [key, expected] of Object.entries(expectedRowValues)) {
  if (row?.[key] !== expected) {
    throw new Error(`Sheets row ${key} should be ${JSON.stringify(expected)}, got ${JSON.stringify(row?.[key])}`);
  }
}

if (!/^sborkai-\d{8}T\d{6}-[a-z0-9]{6}$/.test(row.lead_id)) {
  throw new Error(`Unexpected lead id: ${row.lead_id}`);
}

if (!row.created_at || Number.isNaN(Date.parse(row.created_at))) {
  throw new Error(`Unexpected created_at timestamp: ${row.created_at}`);
}

const answers = JSON.parse(row.answers_json);
if (answers.actions !== payload.answers.actions) {
  throw new Error("Sheets row answers_json should contain the submitted answers");
}

calls.length = 0;
delete process.env.SHEETS_WEBHOOK_URL;
delete process.env.SHEETS_WEBHOOK_SECRET;
globalThis.fetch = async (url, init) => {
  calls.push({ url: String(url), init });
  return {
    ok: true,
    json: async () => ({ ok: true }),
  };
};

const telegramOnlyResponse = await invokeHandler(payload);
if (telegramOnlyResponse.statusCode !== 200 || telegramOnlyResponse.body?.ok !== true) {
  throw new Error(
    `Expected Telegram-only delivery when Sheets env is missing, got ${telegramOnlyResponse.statusCode} ${JSON.stringify(telegramOnlyResponse.body)}`,
  );
}

if (calls.length !== 1 || !calls[0].url.includes("api.telegram.org")) {
  throw new Error(`Expected only Telegram delivery call without Sheets env, got ${calls.length}`);
}

process.env.SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/test/exec";
process.env.SHEETS_WEBHOOK_SECRET = "sheet-secret";
calls.length = 0;
globalThis.fetch = async (url, init) => {
  calls.push({ url: String(url), init });
  return {
    ok: true,
    json: async () => ({ ok: String(url) !== process.env.SHEETS_WEBHOOK_URL }),
  };
};

const rejectedSheetsResponse = await invokeHandler(payload);
if (rejectedSheetsResponse.statusCode !== 500 || rejectedSheetsResponse.body?.error !== "sheets_delivery_failed") {
  throw new Error(
    `Expected sheets_delivery_failed when Apps Script returns ok:false, got ${rejectedSheetsResponse.statusCode} ${JSON.stringify(rejectedSheetsResponse.body)}`,
  );
}

console.log("Lead delivery check passed.");
