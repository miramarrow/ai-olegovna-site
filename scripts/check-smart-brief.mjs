import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";

const read = (path) => readFileSync(join(process.cwd(), path), "utf8");
const assertIncludes = (content, expected, label) => {
  if (!content.includes(expected)) {
    throw new Error(`${label} should include ${expected}`);
  }
};
const assertNotIncludes = (content, forbidden, label) => {
  if (content.includes(forbidden)) {
    throw new Error(`${label} should not include ${forbidden}`);
  }
};

const sourcePath = join(process.cwd(), "src/data/briefTemplates.ts");

if (!existsSync(sourcePath)) {
  throw new Error("Missing src/data/briefTemplates.ts");
}

const source = readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2020,
    strict: true,
  },
});

const tempDir = mkdtempSync(join(tmpdir(), "smart-brief-"));
const compiledPath = join(tempDir, "briefTemplates.mjs");
writeFileSync(compiledPath, compiled.outputText);

const {
  briefTemplates,
  serviceOptions,
  startFormats,
  buildBriefMessage,
} = await import(compiledPath);

const requiredServices = [
  "free-consultation",
  "neuro-office",
  "ai-agents",
  "content-factory",
  "automation",
  "website-development",
  "telegram-max-bots",
  "max-automation",
  "support",
];

const labels = serviceOptions.map((service) => service.label);

for (const service of requiredServices) {
  if (!briefTemplates[service]) {
    throw new Error(`Missing brief template for ${service}`);
  }

  if (!serviceOptions.some((option) => option.value === service)) {
    throw new Error(`Missing service option for ${service}`);
  }

  const questionCount = briefTemplates[service].questions.length;
  if (service === "free-consultation") {
    if (questionCount !== 0) {
      throw new Error(`free-consultation should not require follow-up fields, got ${questionCount} questions`);
    }
  } else if (questionCount < 5 || questionCount > 7) {
    throw new Error(`${service} should have 5-7 questions, got ${questionCount}`);
  }
}

const expectedLabels = [
  "Не знаю, что нужно",
  "Нейроофис",
  "AI-агент",
  "Контент-завод",
  "Автоматизация",
  "Разработка сайтов",
  "Telegram и MAX-боты",
  "MAX-автоматизации",
  "Поддержка",
];

for (const label of expectedLabels) {
  if (!labels.includes(label)) {
    throw new Error(`Missing service label: ${label}`);
  }
}

const requiredStartFormats = [
  "Хочу понять объём",
  "Нужна бесплатная консультация",
  "Нужен быстрый запуск",
  "Есть готовое ТЗ",
  "Нужна система под ключ",
];

for (const format of requiredStartFormats) {
  if (!startFormats.includes(format)) {
    throw new Error(`Missing start format: ${format}`);
  }
}

const telegramMaxQuestionText = briefTemplates["telegram-max-bots"].questions
  .map((question) => `${question.label} ${question.placeholder ?? ""}`)
  .join(" ")
  .toLowerCase();

for (const word of ["telegram", "max", "сценар", "интеграц", "ai"]) {
  if (!telegramMaxQuestionText.includes(word)) {
    throw new Error(`Telegram/MAX brief should mention ${word}`);
  }
}

const consultationText = [
  serviceOptions.find((service) => service.value === "free-consultation")?.description ?? "",
  briefTemplates["free-consultation"].title,
  briefTemplates["free-consultation"].description,
  ...briefTemplates["free-consultation"].questions.flatMap((question) => [
    question.label,
    question.placeholder ?? "",
  ]),
].join(" ");

for (const expected of ["не знаете", "бесплатная консультация", "подберем формат"]) {
  if (!consultationText.toLowerCase().includes(expected)) {
    throw new Error(`Free consultation brief should mention: ${expected}`);
  }
}

const message = buildBriefMessage({
  contacts: {
    name: "Мария",
    preferredContact: "Telegram",
    phone: "+7 999 000-00-00",
    telegram: "@sborkairu",
  },
  service: "telegram-max-bots",
  startFormat: "Нужен быстрый запуск",
  answers: {
    platform: "Telegram и MAX",
    userScenario: "Заявки и поддержка",
  },
  comment: "Запуск в июле",
});

const consultationMessage = buildBriefMessage({
  contacts: {
    name: "Иван",
    preferredContact: "WhatsApp",
    phone: "+7 999 111-22-33",
    telegram: "",
  },
  service: "free-consultation",
  startFormat: "Нужна бесплатная консультация",
  answers: {},
  comment: "",
});

for (const expected of [
  "Не знаю, что нужно",
  "Нужна бесплатная консультация",
]) {
  if (!consultationMessage.includes(expected)) {
    throw new Error(`Free consultation message misses: ${expected}`);
  }
}

for (const forbidden of ["Ответы брифа:", "Есть хаос в заявках"]) {
  if (consultationMessage.includes(forbidden)) {
    throw new Error(`Free consultation message should not include follow-up field content: ${forbidden}`);
  }
}

for (const expected of [
  "Заявка Sborkai",
  "Мария",
  "Telegram и MAX-боты",
  "Нужен быстрый запуск",
  "Заявки и поддержка",
  "Запуск в июле",
]) {
  if (!message.includes(expected)) {
    throw new Error(`Built message misses: ${expected}`);
  }
}

const hero = read("src/components/Hero.tsx");
assertIncludes(hero, "<span className=\"block\">Автоматизация бизнеса на базе AI</span>", "Hero headline");
assertNotIncludes(hero, "whitespace-nowrap\">под ключ</span>", "Hero headline");
assertIncludes(hero, "n8n · боты · агенты ·  сайты", "Hero badge");
assertIncludes(hero, "Разрабатываем Telegram-ботов, сайты, n8n-автоматизации, AI-агентов и контент-заводы. От идеи до запуска.", "Hero description");
assertIncludes(hero, "<RotatingText", "Hero rotating text");
assertNotIncludes(hero, "\"на базе AI\"", "Hero rotating text");
assertNotIncludes(hero, "цифровые решения для бизнеса", "Hero badge");
assertNotIncludes(hero, "AI-продуктовый бренд под ключ", "Hero badge");
assertNotIncludes(hero, "16ch", "Hero rotating pill");
assertNotIncludes(hero, "<span className=\"block\">под ключ</span>", "Hero headline");

const about = read("src/components/AboutSection.tsx");
assertNotIncludes(about, "lucide-react", "AboutSection");
assertNotIncludes(about, "icon:", "AboutSection advantages");
assertNotIncludes(about, "const Icon", "AboutSection cards");

const footer = read("src/components/Footer.tsx");
assertNotIncludes(footer, "Bot", "Footer brand");

const form = read("src/components/ProjectDiscussForm.tsx");
assertIncludes(form, "const isFreeConsultation = formData.service === \"free-consultation\"", "ProjectDiscussForm free consultation state");
assertIncludes(form, "startFormat: isFreeConsultation ? \"Нужна бесплатная консультация\" : formData.startFormat", "ProjectDiscussForm free consultation payload");
assertIncludes(form, "answers: isFreeConsultation ? {} : formData.answers", "ProjectDiscussForm free consultation payload");
assertIncludes(form, "{!isFreeConsultation && (", "ProjectDiscussForm free consultation conditional fields");
assertIncludes(form, "После отправки", "ProjectDiscussForm follow-up block");
assertIncludes(form, "читаю контекст", "ProjectDiscussForm follow-up block");
assertIncludes(form, "уточняю детали", "ProjectDiscussForm follow-up block");
assertIncludes(form, "предлагаю формат и стоимость", "ProjectDiscussForm follow-up block");
assertIncludes(form, "Отправляем...", "ProjectDiscussForm submit button");
assertIncludes(form, "aria-busy={isSubmitting}", "ProjectDiscussForm submit button");
assertIncludes(form, "fetch(\"/api/telegram-brief\"", "ProjectDiscussForm submission");
assertNotIncludes(form, "Отправить в WhatsApp", "ProjectDiscussForm");
assertNotIncludes(form, "Скопировать и открыть Telegram", "ProjectDiscussForm");
assertNotIncludes(form, "DeliveryChannel", "ProjectDiscussForm");
assertNotIncludes(form, "copyToClipboard", "ProjectDiscussForm");

assertIncludes(hero, "Бриф занимает несколько минут, ответы сразу уйдут в Telegram", "Hero CTA bridge");

const apiPath = join(process.cwd(), "api/telegram-brief.ts");
if (!existsSync(apiPath)) {
  throw new Error("Missing api/telegram-brief.ts");
}

const api = read("api/telegram-brief.ts");
assertIncludes(api, "const isQuickConsultation = startFormat === \"Нужна бесплатная консультация\"", "telegram brief API quick consultation mode");
assertIncludes(api, "if (isQuickConsultation) {", "telegram brief API quick consultation mode");
assertIncludes(api, "answers: {}", "telegram brief API quick consultation payload");

const envExample = read(".env.example");
assertIncludes(envExample, "TELEGRAM_BOT_TOKEN=", ".env.example");
assertIncludes(envExample, "TELEGRAM_CHAT_ID=", ".env.example");
assertNotIncludes(envExample, "VITE_TELEGRAM_BOT_TOKEN", ".env.example");
assertNotIncludes(envExample, "VITE_TELEGRAM_CHAT_ID", ".env.example");

console.log("Smart brief check passed.");
