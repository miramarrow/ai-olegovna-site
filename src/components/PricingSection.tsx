const projectFormats = [
  "Пилот одного сценария",
  "Поэтапный запуск",
  "Система под ключ",
];

const assessmentFactors = [
  "Цель и ожидаемый результат.",
  "Количество сценариев и ролей.",
  "Готовность контента и базы знаний.",
  "Интеграции с CRM, таблицами и мессенджерами.",
  "Требования к AI-логике и поддержке.",
  "Срочность и этапность работ.",
];

const PricingSection = () => {
  return (
    <section className="bg-secondary px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 md:grid-cols-[0.74fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Оценка проекта</p>
            <h2 className="text-3xl font-bold md:text-5xl">Сначала понимаем объём, потом считаем</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Цена зависит от задачи, количества сценариев, интеграций и требований к запуску.
          </p>
        </div>

        <div className="linear-abstract grid gap-10 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold">Что влияет на оценку</h3>
              <span className="h-px w-24 bg-primary/30" aria-hidden="true" />
            </div>
            <div className="border-b border-border">
              {assessmentFactors.map((factor, index) => (
                <div key={factor} className="grid gap-3 border-t border-border py-4 sm:grid-cols-[4.5rem_1fr]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-2 w-2 border border-primary/60 bg-white" aria-hidden="true" />
                  </div>
                  <span className="leading-relaxed text-muted-foreground">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold">Форматы старта</h3>
              <span className="h-px w-16 bg-primary/30" aria-hidden="true" />
            </div>
            <div className="border-b border-border">
              {projectFormats.map((format, index) => (
                <div key={format} className="flex items-center gap-4 border-t border-border py-4">
                  <span className="font-mono text-sm text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-2 w-2 rotate-45 bg-primary/70" aria-hidden="true" />
                  <span className="font-medium text-foreground">{format}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Каждый формат можно разбить на самостоятельные этапы с отдельным результатом.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
