import type { IncomingMessage, ServerResponse } from "node:http";
import {
  briefTemplates,
  buildBriefMessage,
  serviceOptions,
  startFormats,
  type BriefMessageInput,
  type ServiceSlug,
} from "../src/data/briefTemplates.js";

type ApiRequest = IncomingMessage & {
  body?: unknown;
};

type JsonResponse = {
  ok: boolean;
  error?: string;
};

type DeliveryResponse = {
  ok?: unknown;
};

type LeadRow = {
  created_at: string;
  lead_id: string;
  form_type: string;
  name: string;
  preferred_contact: string;
  phone: string;
  telegram: string;
  service: string;
  start_format: string;
  comment: string;
  answers_json: string;
  page_url: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
};

const telegramApiUrl = (token: string) => `https://api.telegram.org/bot${token}/sendMessage`;

const allowedOrigins = [
  "https://sborkai.ru",
  "http://sborkai.ru",
  "https://www.sborkai.ru",
  "http://www.sborkai.ru",
];

const isLocalOrigin = (origin: string) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

const getAllowedOrigin = (req: ApiRequest) => {
  const origin = req.headers.origin;

  if (typeof origin !== "string") {
    return "";
  }

  return allowedOrigins.includes(origin) || isLocalOrigin(origin) ? origin : "";
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const createLeadId = (date = new Date()) => {
  const timestamp = date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "");
  const suffix = Math.random().toString(36).slice(2, 8).padEnd(6, "0");
  return `sborkai-${timestamp}-${suffix}`;
};

const isServiceSlug = (value: unknown): value is ServiceSlug =>
  typeof value === "string" && serviceOptions.some((service) => service.value === value);

const sendJson = (res: ServerResponse, statusCode: number, payload: JsonResponse) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

const applyCorsHeaders = (req: ApiRequest, res: ServerResponse) => {
  const origin = getAllowedOrigin(req);

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const readBody = async (req: ApiRequest) => {
  if (req.body !== undefined) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }

  const rawBody = await new Promise<string>((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");

      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });

  return rawBody ? JSON.parse(rawBody) : {};
};

const validateBriefPayload = (payload: unknown): BriefMessageInput | null => {
  if (!isRecord(payload) || !isRecord(payload.contacts)) {
    return null;
  }

  const name = asTrimmedString(payload.contacts.name);
  const preferredContact = asTrimmedString(payload.contacts.preferredContact);
  const phone = asTrimmedString(payload.contacts.phone);
  const telegram = asTrimmedString(payload.contacts.telegram);
  const startFormat = asTrimmedString(payload.startFormat);
  const source = normalizeBriefSource(payload.source);

  if (!name || !preferredContact || (!phone && !telegram)) {
    return null;
  }

  if (!isServiceSlug(payload.service) || !startFormats.includes(startFormat)) {
    return null;
  }

  if (!isRecord(payload.answers)) {
    return null;
  }

  const isQuickConsultation = startFormat === "Нужна бесплатная консультация";

  if (isQuickConsultation) {
    return {
      contacts: {
        name,
        preferredContact,
        phone,
        telegram,
      },
      service: payload.service,
      startFormat,
      answers: {},
      comment: asTrimmedString(payload.comment),
      source,
    };
  }

  const rawAnswers = payload.answers;
  const template = briefTemplates[payload.service];
  const answers = template.questions.reduce<Record<string, string> | null>((result, question) => {
    if (result === null) {
      return null;
    }

    const answer = asTrimmedString(rawAnswers[question.id]);
    if (!answer) {
      return null;
    }

    return {
      ...result,
      [question.id]: answer,
    };
  }, {});

  if (answers === null) {
    return null;
  }

  return {
    contacts: {
      name,
      preferredContact,
      phone,
      telegram,
    },
    service: payload.service,
    startFormat,
    answers,
    comment: asTrimmedString(payload.comment),
    source,
  };
};

const normalizeBriefSource = (value: unknown): NonNullable<BriefMessageInput["source"]> => {
  if (!isRecord(value)) {
    return {
      formType: "unknown",
      pageUrl: "",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    };
  }

  return {
    formType: asTrimmedString(value.formType) || "unknown",
    pageUrl: asTrimmedString(value.pageUrl),
    referrer: asTrimmedString(value.referrer),
    utmSource: asTrimmedString(value.utmSource),
    utmMedium: asTrimmedString(value.utmMedium),
    utmCampaign: asTrimmedString(value.utmCampaign),
  };
};

const buildLeadRow = (brief: BriefMessageInput, leadId: string, createdAt: string): LeadRow => ({
  created_at: createdAt,
  lead_id: leadId,
  form_type: brief.source?.formType ?? "unknown",
  name: brief.contacts.name,
  preferred_contact: brief.contacts.preferredContact,
  phone: brief.contacts.phone ?? "",
  telegram: brief.contacts.telegram ?? "",
  service: brief.service,
  start_format: brief.startFormat,
  comment: brief.comment ?? "",
  answers_json: JSON.stringify(brief.answers),
  page_url: brief.source?.pageUrl ?? "",
  referrer: brief.source?.referrer ?? "",
  utm_source: brief.source?.utmSource ?? "",
  utm_medium: brief.source?.utmMedium ?? "",
  utm_campaign: brief.source?.utmCampaign ?? "",
});

const sendTelegramBrief = async (token: string, chatId: string, brief: BriefMessageInput, leadId: string) => {
  const telegramResponse = await fetch(telegramApiUrl(token), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `${buildBriefMessage(brief)}\n\nID заявки: ${leadId}`,
      disable_web_page_preview: true,
    }),
  });

  return telegramResponse.ok;
};

const sendLeadToSheets = async (webhookUrl: string, secret: string, row: LeadRow) => {
  const sheetsResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret,
      row,
    }),
  });

  if (!sheetsResponse.ok) {
    return false;
  }

  try {
    const payload = (await sheetsResponse.json()) as DeliveryResponse;
    return payload.ok !== false;
  } catch {
    return true;
  }
};

export default async function handler(req: ApiRequest, res: ServerResponse) {
  applyCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 400, { ok: false, error: "invalid_request" });
    return;
  }

  let body: unknown;

  try {
    body = await readBody(req);
  } catch {
    sendJson(res, 400, { ok: false, error: "invalid_json" });
    return;
  }

  const brief = validateBriefPayload(body);
  if (!brief) {
    sendJson(res, 400, { ok: false, error: "invalid_payload" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  const sheetsWebhookUrl = process.env.SHEETS_WEBHOOK_URL?.trim();
  const sheetsWebhookSecret = process.env.SHEETS_WEBHOOK_SECRET?.trim();

  if (!token || !chatId) {
    sendJson(res, 500, { ok: false, error: "missing_telegram_env" });
    return;
  }

  const createdAt = new Date().toISOString();
  const leadId = createLeadId(new Date(createdAt));
  const leadRow = buildLeadRow(brief, leadId, createdAt);

  try {
    const telegramDelivered = await sendTelegramBrief(token, chatId, brief, leadId);

    if (!telegramDelivered) {
      sendJson(res, 500, { ok: false, error: "telegram_delivery_failed" });
      return;
    }

    if (sheetsWebhookUrl && sheetsWebhookSecret) {
      const sheetsDelivered = await sendLeadToSheets(sheetsWebhookUrl, sheetsWebhookSecret, leadRow);

      if (!sheetsDelivered) {
        sendJson(res, 500, { ok: false, error: "sheets_delivery_failed" });
        return;
      }
    }

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 500, { ok: false, error: "lead_delivery_failed" });
  }
}
