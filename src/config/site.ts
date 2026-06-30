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
    telegramLabel: "@miramarrow",
    telegramUrl: "https://t.me/miramarrow",
    whatsappUrl: "https://wa.me/79932577740",
    phoneLabel: "+7 (993) 257-77-40",
    phoneHref: "tel:+79932577740",
  },
  navigation: [
    { name: "О проекте", href: "/about" },
    { name: "Услуги", href: "/services" },
    { name: "Оценка", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Контакты", href: "/contacts" },
  ],
  footerCompanyLinks: [
    { name: "О проекте", href: "/about" },
    { name: "Услуги", href: "/services" },
    { name: "Оценка", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Контакты", href: "/contacts" },
  ],
};
