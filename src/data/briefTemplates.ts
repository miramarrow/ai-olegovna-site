export type ServiceSlug =
  | "free-consultation"
  | "neuro-office"
  | "ai-agents"
  | "content-factory"
  | "automation"
  | "website-development"
  | "telegram-max-bots"
  | "max-automation"
  | "support";

export type ContactMethod = "phone" | "whatsapp" | "telegram";

export interface ServiceOption {
  value: ServiceSlug;
  label: string;
  description: string;
}

export interface BriefQuestion {
  id: string;
  label: string;
  placeholder?: string;
}

export interface BriefTemplate {
  title: string;
  description: string;
  questions: BriefQuestion[];
}

export interface BriefMessageInput {
  contacts: {
    name: string;
    preferredContact: string;
    phone?: string;
    telegram?: string;
  };
  service: ServiceSlug;
  startFormat: string;
  answers: Record<string, string>;
  comment?: string;
}

export const serviceOptions: ServiceOption[] = [
  { value: "free-consultation", label: "Не знаю, что нужно", description: "Бесплатная консультация: разберем задачу и подберем формат старта" },
  { value: "neuro-office", label: "Нейроофис", description: "AI-процессы для отделов, рутины, документов и внутренних команд" },
  { value: "ai-agents", label: "AI-агент", description: "Ассистент с ролью, базой знаний, каналами и передачей человеку" },
  { value: "content-factory", label: "Контент-завод", description: "Регулярное производство текстов, визуалов, видео и идей" },
  { value: "automation", label: "Автоматизация", description: "Связка сервисов, заявок, таблиц, CRM и отчетности" },
  { value: "website-development", label: "Разработка сайтов", description: "Лендинги, сайты услуг, кабинеты и веб-сервисы с интеграциями" },
  { value: "telegram-max-bots", label: "Telegram и MAX-боты", description: "Клиентские сценарии, заявки, поддержка, уведомления и AI-ответы" },
  { value: "max-automation", label: "MAX-автоматизации", description: "Процессы, уведомления и интеграции под доступные возможности MAX" },
  { value: "support", label: "Поддержка", description: "Сопровождение, развитие, мониторинг и доработка запущенных решений" },
];

export const startFormats = [
  "Хочу понять объём",
  "Нужна бесплатная консультация",
  "Нужен быстрый запуск",
  "Есть готовое ТЗ",
  "Нужна система под ключ",
];

export const briefTemplates: Record<ServiceSlug, BriefTemplate> = {
  "free-consultation": {
    title: "Мини-бриф на бесплатную консультацию",
    description: "Если не знаете, что именно нужно, выберите этот вариант: консультация бесплатная, разложим задачу и подберем формат старта.",
    questions: [],
  },
  "website-development": {
    title: "Мини-бриф на сайт",
    description: "Поможет понять тип сайта, содержание и нужные интеграции.",
    questions: [
      { id: "siteType", label: "Какой тип сайта нужен?", placeholder: "Лендинг, сайт услуг, каталог, интернет-магазин, личный кабинет" },
      { id: "goal", label: "Какая главная цель сайта?", placeholder: "Заявки, продажи, презентация продукта, запись, база знаний" },
      { id: "sections", label: "Какие разделы нужны?", placeholder: "Главная, услуги, FAQ, контакты, блог, каталог" },
      { id: "content", label: "Что уже есть по контенту?", placeholder: "Тексты, фото, брендбук, структура, ничего нет" },
      { id: "integrations", label: "Какие интеграции нужны?", placeholder: "CRM, формы, платежи, рассылки, аналитика, Telegram/MAX" },
      { id: "references", label: "Есть ли референсы?", placeholder: "Ссылки на сайты, которые нравятся или точно не подходят" },
      { id: "deadline", label: "Есть ли желаемый срок запуска?", placeholder: "Дата, событие или просто комфортный темп" },
    ],
  },
  "telegram-max-bots": {
    title: "Мини-бриф на бот для Telegram/MAX",
    description: "Соберем сценарии, каналы, интеграции и AI-функции.",
    questions: [
      { id: "platform", label: "Где нужен бот?", placeholder: "Telegram, MAX или обе платформы" },
      { id: "userScenario", label: "Какой сценарий проходит пользователь?", placeholder: "Заявка, запись, подбор услуги, поддержка, уведомления" },
      { id: "requestsPayments", label: "Нужны заявки, оплаты или статусы?", placeholder: "Что собираем, где храним, что показываем пользователю" },
      { id: "integrations", label: "Какие интеграции нужны для бота?", placeholder: "CRM, таблицы, сайт, склад, платежи, календарь" },
      { id: "aiFeatures", label: "Какие AI-функции нужны?", placeholder: "Ответы по базе знаний, квалификация заявок, генерация текста" },
      { id: "adminPanel", label: "Нужна ли админка?", placeholder: "Роли, статусы, выгрузки, ручное управление" },
      { id: "broadcasts", label: "Нужны ли рассылки и уведомления?", placeholder: "Кому, по каким событиям, с какой частотой" },
    ],
  },
  "max-automation": {
    title: "Мини-бриф на MAX-автоматизацию",
    description: "Опишем процессы и спроектируем сценарии под доступные возможности платформы.",
    questions: [
      { id: "processes", label: "Какие процессы должны идти через MAX?", placeholder: "Заявки, статусы, согласования, уведомления, поддержка" },
      { id: "participants", label: "Кто участвует в процессе?", placeholder: "Клиенты, менеджеры, руководители, операторы, подрядчики" },
      { id: "triggers", label: "Какие события должны запускать автоматизацию?", placeholder: "Новая заявка, смена статуса, дедлайн, сообщение, оплата" },
      { id: "dataTargets", label: "Куда передавать данные?", placeholder: "CRM, таблицы, база, сайт, внутренний чат, отчет" },
      { id: "notifications", label: "Какие уведомления нужны?", placeholder: "Кому писать, что сообщать, когда напоминать" },
      { id: "aiUsage", label: "Где нужен AI?", placeholder: "Классификация, резюме, ответы, проверка данных, подсказки" },
    ],
  },
  "neuro-office": {
    title: "Мини-бриф на нейроофис",
    description: "Найдём, где AI закроет рутину быстрее всего.",
    questions: [
      { id: "departments", label: "Какие отделы или роли хотите усилить?", placeholder: "Продажи, маркетинг, поддержка, HR, руководитель, ассистент" },
      { id: "routine", label: "Какая рутина отнимает больше всего времени?", placeholder: "Документы, ответы, отчеты, заявки, контент, согласования" },
      { id: "tools", label: "Какими инструментами команда уже пользуется?", placeholder: "CRM, таблицы, мессенджеры, почта, Notion, 1C, сайт" },
      { id: "dataSources", label: "Где лежат данные и знания?", placeholder: "Документы, чаты, таблицы, база знаний, сайт, файлы" },
      { id: "users", label: "Сколько людей будет пользоваться системой?", placeholder: "Команда, отдел, руководитель, внешние клиенты" },
      { id: "result", label: "Какой результат будет считаться успехом?", placeholder: "Меньше ручной работы, быстрее ответы, больше заявок, контроль" },
      { id: "support", label: "Нужна ли поддержка после запуска?", placeholder: "Обучение команды, регламенты, доработки, ежемесячное ведение" },
    ],
  },
  "ai-agents": {
    title: "Мини-бриф на AI-агента",
    description: "Определим роль агента, знания, каналы и границы ответственности.",
    questions: [
      { id: "role", label: "Какую роль должен выполнять агент?", placeholder: "Менеджер, консультант, аналитик, редактор, помощник руководителя" },
      { id: "channel", label: "Где агент должен работать?", placeholder: "Сайт, Telegram/MAX, CRM, почта, внутренняя панель" },
      { id: "knowledgeBase", label: "Какая база знаний ему нужна?", placeholder: "FAQ, документы, регламенты, сайт" },
      { id: "integrations", label: "Какие интеграции нужны?", placeholder: "CRM, календарь, таблицы, база данных, платежи, документы" },
      { id: "handoff", label: "Когда агент должен передавать задачу человеку?", placeholder: "Сложный вопрос, жалоба, оплата, нестандартная заявка" },
      { id: "toneLimits", label: "Какие нужны тон и ограничения?", placeholder: "Стиль общения, запрет обещаний, юридические или бренд-рамки" },
    ],
  },
  "content-factory": {
    title: "Мини-бриф на контент-завод",
    description: "Соберем площадки, объем, голос бренда и процесс согласования.",
    questions: [
      { id: "platforms", label: "Для каких площадок нужен контент?", placeholder: "Telegram, MAX, VK, сайт, блог, YouTube, Reels/Shorts" },
      { id: "volume", label: "Какой объем нужен?", placeholder: "Постов в неделю, роликов в месяц, карточек, писем, статей" },
      { id: "formats", label: "Какие форматы важны?", placeholder: "Посты, сценарии, изображения, видео, рассылки, лендинги" },
      { id: "brandVoice", label: "Как звучит бренд?", placeholder: "Экспертно, дружелюбно, дерзко, спокойно, премиально" },
      { id: "sources", label: "Откуда брать фактуру?", placeholder: "Эксперты, статьи, записи созвонов, база знаний, сайт" },
      { id: "approval", label: "Как будет идти согласование?", placeholder: "Кто смотрит, сколько итераций, где оставлять правки" },
      { id: "regularity", label: "Какая регулярность нужна?", placeholder: "Разовый запуск, месяц, квартал, постоянное ведение" },
    ],
  },
  automation: {
    title: "Мини-бриф на автоматизацию",
    description: "Разберем текущий процесс, триггеры, действия и исключения.",
    questions: [
      { id: "currentProcess", label: "Как процесс работает сейчас?", placeholder: "Опишите путь от события до результата" },
      { id: "services", label: "Какие сервисы участвуют?", placeholder: "CRM, таблицы, сайт, мессенджеры, почта, 1C, платежи" },
      { id: "triggers", label: "Что должно запускать автоматизацию?", placeholder: "Заявка, письмо, оплата, статус, дата, сообщение" },
      { id: "actions", label: "Какие действия должны происходить автоматически?", placeholder: "Создать карточку, отправить сообщение, обновить таблицу, поставить задачу" },
      { id: "exceptions", label: "Какие бывают исключения?", placeholder: "Ошибки, ручная проверка, разные ветки, нестандартные клиенты" },
      { id: "reporting", label: "Какая отчетность нужна?", placeholder: "Статусы, логи, уведомления, дашборд, еженедельный отчет" },
    ],
  },
  support: {
    title: "Мини-бриф на поддержку",
    description: "Поймем, что уже запущено и какой режим сопровождения нужен.",
    questions: [
      { id: "project", label: "Что нужно поддерживать?", placeholder: "Сайт, бот для Telegram/MAX, автоматизация, AI-агент, интеграции" },
      { id: "state", label: "В каком состоянии проект сейчас?", placeholder: "Работает, есть ошибки, нужна передача, нужен аудит" },
      { id: "stackAccess", label: "Какие технологии и доступы есть?", placeholder: "Хостинг, репозиторий, админка, CRM, n8n, документация" },
      { id: "frequency", label: "Как часто нужна помощь?", placeholder: "Разово, несколько часов в месяц, регулярное сопровождение" },
      { id: "priority", label: "Какие задачи самые срочные?", placeholder: "Ошибки, обновления, новые функции, безопасность, аналитика" },
      { id: "communication", label: "Как удобнее вести поддержку?", placeholder: "Чат, задачи, еженедельные созвоны, отчеты" },
    ],
  },
};

export const getServiceLabel = (service: ServiceSlug) =>
  serviceOptions.find((option) => option.value === service)?.label ?? service;

export const buildBriefMessage = ({
  contacts,
  service,
  startFormat,
  answers,
  comment,
}: BriefMessageInput) => {
  const template = briefTemplates[service];
  const answerLines = template.questions
    .map((question) => {
      const value = answers[question.id]?.trim();
      return value ? `- ${question.label}: ${value}` : "";
    })
    .filter(Boolean);
  const answerSection = answerLines.length > 0 ? ["", "Ответы брифа:", ...answerLines] : [];

  return [
    "Заявка Ai, Олеговна!",
    "",
    "Контакты:",
    `- Имя: ${contacts.name}`,
    `- Удобный способ связи: ${contacts.preferredContact}`,
    contacts.phone ? `- Телефон: ${contacts.phone}` : "",
    contacts.telegram ? `- Telegram: ${contacts.telegram}` : "",
    "",
    `Услуга: ${getServiceLabel(service)}`,
    `Формат старта: ${startFormat}`,
    ...answerSection,
    comment?.trim() ? "" : "",
    comment?.trim() ? `Комментарий: ${comment.trim()}` : "",
  ]
    .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
    .join("\n")
    .trim();
};
