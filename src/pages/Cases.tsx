import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import AbstractServiceMark from "@/components/AbstractServiceMark";
import ServiceAbstractVisual from "@/components/ServiceAbstractVisual";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/pages/services/servicesData";

const Cases = () => {
  const [activeSlug, setActiveSlug] = useState(servicesData[0].slug);
  const activeService = servicesData.find((service) => service.slug === activeSlug) ?? servicesData[0];

  return (
    <div className="relative min-h-screen bg-background">
      <CodeRain />
      <div className="relative z-10">
        <Header />

        <section className="bg-white px-4 pb-12 pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Кейсы</p>
              <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
            </div>
            <h1 className="mb-5 max-w-4xl text-4xl font-bold md:text-6xl">
              Работы по AI-системам и автоматизациям
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Разделяем будущие кейсы по видам услуг, чтобы было проще найти близкий сценарий
              и понять, как задача превращается в рабочее решение.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
              {servicesData.map((service) => {
                const isActive = service.slug === activeService.slug;

                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => setActiveSlug(service.slug)}
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-white text-muted-foreground hover:border-primary/45 hover:text-primary"
                    }`}
                  >
                    {service.shortTitle}
                  </button>
                );
              })}
            </div>

            <div className="linear-abstract grid gap-8 overflow-hidden rounded-md border border-border bg-white p-5 md:p-8 lg:grid-cols-[0.82fr_1fr] lg:items-stretch">
              <div className="flex min-h-[28rem] flex-col">
                <div className="mb-8 flex items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <AbstractServiceMark mark={activeService.mark} className="h-11 w-11" />
                    <span className="font-mono text-sm text-primary">
                      {String(servicesData.findIndex((service) => service.slug === activeService.slug) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
                </div>

                <div className="max-w-2xl">
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                    Направление кейсов
                  </p>
                  <h2 className="mb-4 text-3xl font-bold md:text-5xl">{activeService.title}</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">{activeService.description}</p>
                </div>

                <div className="mt-auto pt-8">
                  <div className="rounded-md border border-dashed border-primary/35 bg-primary/5 p-5">
                    <h3 className="mb-3 text-2xl font-semibold">Скоро здесь будут реальные работы</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Мы оформляем кейсы красиво. Скоро здесь появятся реальные наши работы —
                      с задачей, решением, стеком и понятным результатом.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="rounded-md" asChild>
                      <a href="/#contact-form">
                        Обсудить похожую задачу
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" className="rounded-md" asChild>
                      <Link to="/services">Смотреть услуги</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <ServiceAbstractVisual mark={activeService.mark} className="min-h-[18rem] lg:min-h-full" />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Cases;
