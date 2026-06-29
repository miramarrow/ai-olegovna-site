import AbstractServiceMark, { type AbstractMarkKey } from "@/components/AbstractServiceMark";
import CodeRain from "@/components/CodeRain";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AboutItem {
  title: string;
  description: string;
  mark: AbstractMarkKey;
}

interface PrincipleTab extends AboutItem {
  value: string;
  points: string[];
}

const projectFocus: AboutItem[] = [
  {
    title: "AI-сценарии",
    description: "Разбираем задачу, роли и границы ответственности до выбора инструментов.",
    mark: "axis",
  },
  {
    title: "Рабочие продукты",
    description: "Сайты, агенты, боты, автоматизации и контент-системы под реальный процесс.",
    mark: "fold",
  },
  {
    title: "Управляемость",
    description: "Фиксируем правила, ограничения и точки передачи человеку.",
    mark: "window",
  },
  {
    title: "Запуск",
    description: "Проверяем сценарии, формы и интеграции до передачи команде.",
    mark: "trace",
  },
];

const launchSteps: AboutItem[] = [
  {
    title: "Диагностика",
    description: "Понимаем, что должно измениться в работе и где сейчас теряется время.",
    mark: "mesh",
  },
  {
    title: "Сценарий",
    description: "Описываем путь пользователя, команды и AI, включая исключения.",
    mark: "ripple",
  },
  {
    title: "Сборка",
    description: "Подключаем сайт, бота, CRM, таблицы, документы или базу знаний.",
    mark: "stack",
  },
  {
    title: "Проверка",
    description: "Тестируем типовые случаи, уточняем тексты, статусы и уведомления.",
    mark: "zero",
  },
  {
    title: "Передача",
    description: "Оставляем инструкции, структуру и понятный следующий шаг.",
    mark: "axis",
  },
];

const principles: PrincipleTab[] = [
  {
    value: "meaning",
    title: "Сначала смысл",
    description: "Инструмент выбирается под сценарий. Не наоборот.",
    mark: "fold",
    points: ["Цель запуска", "Роль AI", "Границы ответа"],
  },
  {
    value: "proof",
    title: "Без лишних обещаний",
    description: "Цифры и возможности появляются только после диагностики и проверки платформ.",
    mark: "mesh",
    points: ["доступы", "сроки", "ограничения"],
  },
  {
    value: "handoff",
    title: "Понятная передача",
    description: "Команда должна понимать, где смотреть статус и что менять после запуска.",
    mark: "ripple",
    points: ["инструкции", "логика", "точки контроля"],
  },
  {
    value: "scale",
    title: "Аккуратное расширение",
    description: "Начинаем с одного сильного маршрута и расширяем систему после первых проверок.",
    mark: "stack",
    points: ["первый сценарий", "данные", "следующий модуль"],
  },
];

const handoffOutcomes: AboutItem[] = [
  {
    title: "Команда понимает систему",
    description: "Структура, правила работы и короткие инструкции для ежедневного использования.",
    mark: "window",
  },
  {
    title: "Изменения без хаоса",
    description: "Новые сценарии, тексты и интеграции добавляются по понятному маршруту.",
    mark: "trace",
  },
  {
    title: "Есть следующий шаг",
    description: "После запуска понятно — что оставить, что улучшить и что проверить позже.",
    mark: "zero",
  },
];

const BlueprintPanel = () => (
  <div className="linear-abstract relative min-h-[28rem] overflow-hidden rounded-md border border-border bg-secondary p-6">
    <div className="absolute inset-x-6 top-12 h-px bg-primary/20" aria-hidden="true" />
    <div className="absolute inset-y-6 left-12 w-px bg-primary/20" aria-hidden="true" />
    <div className="absolute bottom-12 left-6 right-6 h-px bg-primary/20" aria-hidden="true" />
    <div className="absolute bottom-6 top-6 right-12 w-px bg-primary/20" aria-hidden="true" />

    <div className="relative z-10 grid h-full gap-4 sm:grid-cols-2">
      {projectFocus.map((item, index) => (
        <div key={item.title} className="flex min-h-36 flex-col justify-between rounded-md border border-border bg-white/80 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <AbstractServiceMark mark={item.mark} className="h-8 w-8" />
          </div>
          <h3 className="mt-8 text-lg font-semibold">{item.title}</h3>
        </div>
      ))}
    </div>
  </div>
);

const LaunchStepper = () => (
  <div className="relative">
    <span className="absolute bottom-8 left-[1.1rem] top-8 w-px bg-primary/25 md:hidden" aria-hidden="true" />
    <span className="absolute left-8 right-8 top-[1.1rem] hidden h-px bg-primary/25 md:block" aria-hidden="true" />
    <div className="grid gap-5 md:grid-cols-5">
      {launchSteps.map((step, index) => (
        <div key={step.title} className="relative rounded-md border border-border bg-white p-5">
          <div className="mb-6 flex items-center justify-between gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/35 bg-white font-mono text-sm text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <AbstractServiceMark mark={step.mark} className="h-8 w-8" />
          </div>
          <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const About = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <CodeRain />
      <Header />

      <main className="relative z-10 flex-grow pt-20">
        <section className="bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">О проекте</p>
              <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
            </div>
            <h1 className="mb-6 max-w-5xl text-4xl font-bold md:text-6xl">
              Создаем системы для бизнеса под конкретную задачу
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Сайты, агенты, нейроофисы, боты, автоматизации и контент-системы — от диагностики до передачи.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center">
            <BlueprintPanel />
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Что делает проект</p>
              <h2 className="mb-5 text-3xl font-bold md:text-4xl">Собирает AI вокруг понятной задачи</h2>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                Смотрим на процесс, выбираем маршрут, собираем систему — которую можно объяснить команде и проверить в работе.
              </p>
              <div className="grid gap-3">
                {projectFocus.map((item, index) => (
                  <div key={item.title} className="grid gap-3 rounded-md border border-border bg-white p-4 sm:grid-cols-[3rem_1fr]">
                    <span className="font-mono text-sm text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="mb-1 font-semibold">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Как подходим к запуску</p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">От диагностики к передаче</h2>
              <p className="leading-relaxed text-muted-foreground">
                Каждый этап — конкретный артефакт: сценарий, сборка, проверка или инструкция.
              </p>
            </div>
            <LaunchStepper />
          </div>
        </section>

        <section className="bg-white px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 grid gap-4 md:grid-cols-[0.55fr_1fr] md:items-end">
              <h2 className="text-3xl font-bold md:text-4xl">Как мы работаем</h2>
              <p className="leading-relaxed text-muted-foreground">
                Важнее оставить систему, которую команда понимает и может развивать — а не выглядеть технологично.
              </p>
            </div>

            <Tabs defaultValue={principles[0].value}>
              <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
                {principles.map((principle) => (
                  <TabsTrigger key={principle.value} value={principle.value} className="rounded-md border border-border bg-white px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/5">
                    {principle.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {principles.map((principle) => (
                <TabsContent key={principle.value} value={principle.value} className="mt-6 rounded-md border border-border bg-white p-6">
                  <div className="grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:items-start">
                    <div>
                      <AbstractServiceMark mark={principle.mark} className="mb-5 h-11 w-11" />
                      <h3 className="mb-3 text-2xl font-semibold">{principle.title}</h3>
                      <p className="leading-relaxed text-muted-foreground">{principle.description}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {principle.points.map((point, index) => (
                        <div key={point} className="rounded-md border border-border bg-secondary p-4">
                          <span className="mb-6 block font-mono text-sm text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="font-medium">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="bg-secondary px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-4 md:grid-cols-[0.55fr_1fr] md:items-end">
              <h2 className="text-3xl font-bold md:text-4xl">После передачи</h2>
              <p className="leading-relaxed text-muted-foreground">
                Проект можно оставить команде, развивать вместе или подключиться точечно под новые сценарии.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {handoffOutcomes.map((outcome, index) => (
                <div key={outcome.title} className="linear-abstract flex min-h-[17rem] flex-col rounded-md border border-border bg-white p-5">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="font-mono text-sm text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <AbstractServiceMark mark={outcome.mark} className="h-9 w-9" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="mb-3 text-xl font-semibold">{outcome.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{outcome.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button size="lg" className="rounded-md" asChild>
                <a href="/#contact-form">Описать задачу</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
