const withBasePath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const siteConfig = {
  name: "Sborkai",
  shortName: "SB",
  domain: "sborkai.ru",
  url: "https://sborkai.ru",
  logoUrl: withBasePath("logo-sborkai-wordmark.png"),
  description:
    "Разрабатываем AI-системы для бизнеса: нейроофисы, агенты, автоматизации, контент-заводы, сайты и боты для Telegram и MAX.",
  contacts: {
    telegramLabel: "@sborkairu",
    telegramUrl: "https://t.me/sborkairu",
    instagramLabel: "@ai_olegovnaa",
    instagramUrl: "https://www.instagram.com/ai_olegovnaa",
    telegramChannelLabel: "@ai_olegovna",
    telegramChannelUrl: "https://t.me/ai_olegovna",
  },
  navigation: [
    { name: "О проекте", href: "/about" },
    { name: "Услуги", href: "/services" },
    { name: "Кейсы", href: "/cases" },
    { name: "Оценка", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Контакты", href: "/contacts" },
  ],
  footerCompanyLinks: [
    { name: "О проекте", href: "/about" },
    { name: "Услуги", href: "/services" },
    { name: "Кейсы", href: "/cases" },
    { name: "Оценка", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Контакты", href: "/contacts" },
  ],
};
