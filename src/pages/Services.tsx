import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import AbstractServiceMark from "@/components/AbstractServiceMark";
import QuickServiceBriefDialog from "@/components/QuickServiceBriefDialog";
import ServiceAbstractVisual from "@/components/ServiceAbstractVisual";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { servicesData, type ServiceData } from "@/pages/services/servicesData";

const getServiceSummary = (service: ServiceData) => {
  if (service.slug === "support") {
    return service.description;
  }

  return service.summary;
};

const Services = () => {
  const [activeSlug, setActiveSlug] = useState(servicesData[0].slug);
  const [briefService, setBriefService] = useState<ServiceData | null>(null);
  const activeService = servicesData.find((service) => service.slug === activeSlug) ?? servicesData[0];

  return (
    <div className="relative min-h-screen bg-background">
      <CodeRain />
      <div className="relative z-10">
        <Header />

        <section className="bg-white px-4 pb-12 pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Каталог услуг</p>
              <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
            </div>
            <h1 className="mb-5 max-w-4xl text-4xl font-bold md:text-6xl">Разработка AI-систем для бизнеса</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Направления запускаются отдельно или собираются в единую AI-систему под ваши процессы.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="service-panel linear-abstract grid gap-8 overflow-hidden rounded-md border border-border bg-white p-5 md:p-8 lg:grid-cols-[0.85fr_1fr] lg:items-stretch">
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
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Активное направление</p>
                  <h2 className="mb-4 text-3xl font-bold md:text-5xl">{activeService.title}</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">{activeService.description}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <Button className="rounded-md" asChild>
                    <Link to={`/services/${activeService.slug}`}>Подробнее</Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-md"
                    onClick={() => setBriefService(activeService)}
                  >
                    Обсудить
                  </Button>
                </div>
              </div>

              <ServiceAbstractVisual mark={activeService.mark} className="min-h-[18rem] lg:min-h-full" />
            </div>

            <Carousel opts={{ align: "start" }} className="mt-8">
              <CarouselContent className="-ml-4">
                {servicesData.map((service, index) => {
                  const isActive = service.slug === activeService.slug;

                  return (
                    <CarouselItem key={service.slug} className="basis-[82%] pl-4 sm:basis-1/2 lg:basis-1/4">
                      <button
                        type="button"
                        onClick={() => setActiveSlug(service.slug)}
                        aria-pressed={isActive}
                        className={`h-full w-full rounded-md border p-3 text-left transition-colors ${
                          isActive
                            ? "border-primary bg-primary/5"
                            : "border-border bg-white hover:border-primary/45"
                        }`}
                      >
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <span className="font-mono text-sm text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <AbstractServiceMark mark={service.mark} className="h-8 w-8" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">{service.shortTitle}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{getServiceSummary(service)}</p>
                      </button>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="mt-5 flex justify-end gap-3">
                <CarouselPrevious className="!static !translate-y-0 rounded-md" />
                <CarouselNext className="!static !translate-y-0 rounded-md" />
              </div>
            </Carousel>

            <QuickServiceBriefDialog
              service={briefService ?? activeService}
              open={briefService !== null}
              onOpenChange={(open) => {
                if (!open) {
                  setBriefService(null);
                }
              }}
            />
          </div>
        </section>

        <section className="bg-white px-4 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 border-t border-border pt-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="mb-3 text-3xl font-bold">Не уверены, что выбрать?</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Заполните умный бриф — подберу направление и формат под вашу задачу.
              </p>
            </div>
            <Button size="lg" className="rounded-md" asChild>
              <a href="/#contact-form">Перейти к брифу</a>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Services;
