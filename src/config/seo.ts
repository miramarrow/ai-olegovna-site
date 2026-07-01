import { siteConfig } from "@/config/site";
import { servicesData } from "@/pages/services/servicesData";

export interface SeoMetadata {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
}

export const canonicalPaths = [
  "/",
  "/about",
  "/services",
  "/services/neuro-office",
  "/services/ai-agents",
  "/services/content-factory",
  "/services/automation",
  "/services/website-development",
  "/services/telegram-max-bots",
  "/services/max-automation",
  "/services/support",
  "/cases",
  "/pricing",
  "/faq",
  "/contacts",
  "/privacy",
  "/terms",
] as const;

const defaultImageUrl = `${siteConfig.url}/logo-sborkai.png`;

const canonicalUrlForPath = (path: string) => `${siteConfig.url}${path === "/" ? "/" : path}`;

const normalizePath = (path: string) => {
  const withoutTrailingSlash = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return canonicalPaths.includes(withoutTrailingSlash as (typeof canonicalPaths)[number])
    ? withoutTrailingSlash
    : "/";
};

const buildEntry = (path: string, title: string, description: string): SeoMetadata => ({
  path,
  title,
  description,
  canonicalUrl: canonicalUrlForPath(path),
  imageUrl: defaultImageUrl,
});

const staticRouteMetadata: SeoMetadata[] = [
  buildEntry("/", "Sborkai — AI-системы для бизнеса", siteConfig.description),
  buildEntry(
    "/about",
    "О проекте — Sborkai",
    "Создаем сайты, AI-агентов, нейроофисы, боты, автоматизации и контент-системы под конкретные бизнес-процессы.",
  ),
  buildEntry(
    "/services",
    "Услуги — Sborkai",
    "Каталог AI-услуг Sborkai: нейроофисы, AI-агенты, контент-заводы, автоматизация, сайты, Telegram и MAX-боты.",
  ),
  buildEntry(
    "/cases",
    "Кейсы — Sborkai",
    "Направления кейсов Sborkai по AI-системам, автоматизациям, сайтам, ботам и контент-процессам для бизнеса.",
  ),
  buildEntry(
    "/pricing",
    "Оценка стоимости — Sborkai",
    "Короткая диагностика помогает оценить AI-разработку: нейроофис, агент, сайт, бот, автоматизацию или систему под ключ.",
  ),
  buildEntry(
    "/faq",
    "FAQ — Sborkai",
    "Ответы на частые вопросы про AI-системы, оценку проекта, Telegram и MAX, запуск и поддержку после релиза.",
  ),
  buildEntry(
    "/contacts",
    "Контакты — Sborkai",
    "Связаться со Sborkai в Telegram, Instagram или через умный бриф для обсуждения AI-системы, сайта, бота или автоматизации.",
  ),
  buildEntry(
    "/privacy",
    "Политика конфиденциальности — Sborkai",
    "Политика обработки данных для заявок и коммуникации с проектом Sborkai.",
  ),
  buildEntry(
    "/terms",
    "Условия использования — Sborkai",
    "Условия использования сайта Sborkai и материалов проекта.",
  ),
];

const serviceRouteMetadata = servicesData.map((service) =>
  buildEntry(`/services/${service.slug}`, `${service.title} — Sborkai`, service.description),
);

export const routeMetadata = [...staticRouteMetadata, ...serviceRouteMetadata];

const routeMetadataByPath = new Map(routeMetadata.map((entry) => [entry.path, entry]));

export const getSeoForPath = (path: string) =>
  routeMetadataByPath.get(normalizePath(path)) ?? routeMetadataByPath.get("/")!;

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: defaultImageUrl,
      sameAs: [
        siteConfig.contacts.telegramUrl,
        siteConfig.contacts.instagramUrl,
        siteConfig.contacts.telegramChannelUrl,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "ru-RU",
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#professional-service`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: defaultImageUrl,
      description: siteConfig.description,
      provider: {
        "@id": `${siteConfig.url}/#organization`,
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Россия",
        },
        {
          "@type": "Audience",
          audienceType: "Русскоязычные клиенты",
        },
      ],
      availableLanguage: "ru",
      serviceType: servicesData.map((service) => service.title),
      sameAs: [
        siteConfig.contacts.telegramUrl,
        siteConfig.contacts.instagramUrl,
        siteConfig.contacts.telegramChannelUrl,
      ],
    },
  ],
};
