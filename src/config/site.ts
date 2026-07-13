const withBasePath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const siteConfig = {
  name: "Sborkai",
  shortName: "SB",
  domain: "sborkai.ru",
  url: "https://sborkai.ru",
  logoUrl: withBasePath("logo-sborkai-wordmark.png"),
  description:
    "Разрабатываем AI-системы для бизнеса: нейроофисы, агенты, автоматизации, контент-заводы, сайты и боты для Telegram и MAX.",
  operator: {
    displayName: "ИП Демина Валерия Олеговна",
    legalName: "ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ДЕМИНА ВАЛЕРИЯ ОЛЕГОВНА",
    inn: "ИНН 771817673175",
    ogrnip: "ОГРНИП 319508100025132",
    registrationAuthority: "Межрайонная инспекция ФНС № 23 по Московской области",
    publicAddress: "Россия, Московская область, г. Химки",
    businessHours: "Пн-Пт 10:00-19:00 по московскому времени",
  },
  legal: {
    updatedAt: "13.07.2026",
  },
  navigation: [
    { name: "О проекте", href: "/about" },
    { name: "Услуги", href: "/services" },
    { name: "Кейсы", href: "/cases" },
    { name: "Оценка", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
  ],
  footerCompanyLinks: [
    { name: "О проекте", href: "/about" },
    { name: "Услуги", href: "/services" },
    { name: "Кейсы", href: "/cases" },
    { name: "Оценка", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
  ],
};
