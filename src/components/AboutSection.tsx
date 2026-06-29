import AbstractServiceMark, { type AbstractMarkKey } from "@/components/AbstractServiceMark";

const principleMatrix: Array<{
  title: string;
  description: string;
  mark: AbstractMarkKey;
}> = [
  {
    title: "AI-сценарии вместо хаоса",
    description: "Сначала фиксируем процесс и результат — потом выбираем инструменты.",
    mark: "axis",
  },
  {
    title: "Агенты с границами",
    description: "Настраиваем роль, базу знаний, тон, ограничения и передачу сложных задач человеку.",
    mark: "fold",
  },
  {
    title: "Интеграции в работу",
    description: "Связываем сайт, CRM, таблицы, Telegram/MAX, заявки и уведомления в один маршрут.",
    mark: "ripple",
  },
  {
    title: "Контент-заводы",
    description: "Собираем контент-заводы с голосом бренда, источниками фактуры и понятным согласованием.",
    mark: "mesh",
  },
  {
    title: "Передача и рост",
    description: "Структура, инструкции и правила развития — чтобы вы не зависели от нас.",
    mark: "stack",
  },
  {
    title: "Поддержка",
    description: "Помогаем сопровождать, дорабатывать и расширять запущенные решения.",
    mark: "zero",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
          <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">О проекте</p>
          <h2 className="text-3xl font-bold md:text-5xl">
            AI-разработка, которая работает в бизнесе
          </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Берём задачу бизнеса — строим AI-систему под неё. Без лишних инструментов, с документацией и поддержкой после запуска
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principleMatrix.map((advantage, index) => (
            <div key={advantage.title} className="linear-abstract flex min-h-[17rem] flex-col rounded-md border border-border bg-white p-5">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <AbstractServiceMark mark={advantage.mark} className="h-9 w-9" />
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="mb-3 text-xl font-semibold">{advantage.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
