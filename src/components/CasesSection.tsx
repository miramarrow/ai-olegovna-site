import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AbstractServiceMark from "@/components/AbstractServiceMark";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/pages/services/servicesData";

const CasesSection = () => {
  return (
    <section id="cases" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Кейсы</p>
            <h2 className="text-3xl font-bold md:text-5xl">Готовим витрину работ по направлениям</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Мы оформляем кейсы красиво. Скоро здесь появятся реальные наши работы — с задачами,
            решениями и результатами по каждому виду услуг.
          </p>
        </div>

        <div className="linear-abstract grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service, index) => (
            <Link
              key={service.slug}
              to="/cases"
              className="group flex min-h-[12.5rem] flex-col rounded-md border border-border bg-white p-5 transition-colors hover:border-primary/45 hover:bg-primary/5"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <AbstractServiceMark mark={service.mark} className="h-8 w-8" />
              </div>
              <div className="mt-auto">
                <h3 className="mb-2 text-lg font-semibold text-foreground">{service.shortTitle}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Раздел кейсов скоро будет заполнен реальными работами.
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button size="lg" className="rounded-md" asChild>
            <Link to="/cases">
              Смотреть все кейсы
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <a
            href="/#contact-form"
            className="inline-flex border-b border-primary/40 pb-1 text-sm font-medium text-primary transition-colors hover:border-primary hover:text-primary/80"
          >
            Обсудить задачу
          </a>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
