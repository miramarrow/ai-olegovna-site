import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const timelineSteps = [
  {
    title: "Диагностика",
    result: "Фиксируем задачу, ограничения и результат, который нужен на выходе.",
  },
  {
    title: "Сценарий",
    result: "Собираем пользовательский путь, роли агентов и нужные интеграции.",
  },
  {
    title: "Сборка",
    result: "Создаём рабочую версию: бот, сайт, автоматизация или полный нейроофис.",
  },
  {
    title: "Проверка",
    result: "Прогоняем реальные сценарии и убираем слабые места до передачи.",
  },
  {
    title: "Передача",
    result: "Отдаём доступы, логику работы и инструкцию по развитию.",
  },
];

const LaunchProcessSection = () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.7fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Процесс
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">Как проходит запуск</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Разбираем задачу, собираем сценарий, запускаем и передаём с документацией.
          </p>
        </div>

        <div className="relative">
          <span className="absolute bottom-8 left-7 top-8 w-px bg-primary/25 md:hidden" aria-hidden="true" />
          <span className="absolute left-12 right-12 top-8 hidden h-px bg-primary/25 md:block" aria-hidden="true" />

          <div className="grid gap-5 md:grid-cols-5">
            {timelineSteps.map((step, index) => (
              <article
                key={step.title}
                className="relative flex min-h-[17rem] flex-col rounded-md border border-border bg-white p-5"
              >
                <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-md border border-primary/35 bg-white font-mono text-2xl text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-auto">
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.result}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-start">
          <Button size="lg" className="rounded-md" asChild>
            <a href="/#contact-form">
              Описать задачу
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LaunchProcessSection;
