import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startFormats } from "@/data/briefTemplates";

const assessmentFactors = [
  "цель и ожидаемый результат",
  "количество сценариев и ролей",
  "готовность контента и базы знаний",
  "интеграции с CRM, таблицами, сайтом и мессенджерами",
  "требования к AI-логике, админке и поддержке",
  "срочность запуска и этапность работ",
];

const PricingSection = () => {
  return (
    <section className="bg-secondary px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 md:grid-cols-[0.74fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Оценка проекта</p>
            <h2 className="text-3xl font-bold md:text-5xl">Сначала понимаем объем, потом считаем</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Не ставлю жесткий прайс до диагностики: нейроофис, бот, сайт или автоматизация могут быть маленьким запуском или системой под ключ.
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
              {startFormats.map((format, index) => (
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
              Выберите формат в умном брифе, и я предложу следующий шаг: диагностику, быстрый запуск, разбор ТЗ или архитектуру системы.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Button size="lg" className="rounded-md" asChild>
            <a href="/#contact-form">
              Получить оценку через бриф
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
