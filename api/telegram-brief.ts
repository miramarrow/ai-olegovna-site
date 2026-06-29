import type { IncomingMessage, ServerResponse } from "node:http";
import {
  briefTemplates,
  buildBriefMessage,
  serviceOptions,
  startFormats,
  type BriefMessageInput,
  type ServiceSlug,
} from "../src/data/briefTemplates";

type ApiRequest = IncomingMessage & {
  body?: unknown;
};

type JsonResponse = {
  ok: boolean;
  error?: string;
};

const telegramApiUrl = (token: string) => `https://api.telegram.org/bot${token}/sendMessage`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const isServiceSlug = (value: unknown): value is ServiceSlug =>
  typeof value === "string" && serviceOptions.some((service) => service.value === value);

const sendJson = (res: ServerResponse, statusCode: number, payload: JsonResponse) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
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
  };
};

export default async function handler(req: ApiRequest, res: ServerResponse) {
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

  if (!token || !chatId) {
    sendJson(res, 500, { ok: false, error: "missing_telegram_env" });
    return;
  }

  try {
    const telegramResponse = await fetch(telegramApiUrl(token), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildBriefMessage(brief),
        disable_web_page_preview: true,
      }),
    });

    if (!telegramResponse.ok) {
      sendJson(res, 500, { ok: false, error: "telegram_delivery_failed" });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 500, { ok: false, error: "telegram_delivery_failed" });
  }
}
