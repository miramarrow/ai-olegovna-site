import { useState } from "react";
import { Link } from "react-router-dom";
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

const ServicesSection = () => {
  const [briefService, setBriefService] = useState<ServiceData | null>(null);

  return (
    <section id="services" className="relative bg-secondary px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Услуги</p>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              От бота до нейроофиса — под ключ
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Любой масштаб: один бот или полная AI-инфраструктура компании.
            </p>
          </div>
          <Button className="w-fit rounded-md" asChild>
            <a href="/#contact-form">Описать задачу</a>
          </Button>
        </div>

        <Carousel opts={{ align: "start" }} className="linear-abstract">
          <CarouselContent className="-ml-5">
            {servicesData.map((service, index) => (
              <CarouselItem key={service.slug} className="basis-full md:basis-1/2 lg:basis-1/3 pl-5">
                <article className="flex h-full min-h-[23.5rem] flex-col overflow-hidden rounded-md border border-border bg-white">
                  <ServiceAbstractVisual mark={service.mark} className="h-28 border-b border-primary/10" />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="font-mono text-sm text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <AbstractServiceMark mark={service.mark} className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex w-fit border-b border-primary/40 pb-1 text-sm font-medium text-primary transition-colors hover:border-primary hover:text-primary/80"
                      >
                        Подробнее
                      </Link>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="rounded-md"
                        onClick={() => setBriefService(service)}
                      >
                        Обсудить
                      </Button>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-end gap-3">
            <CarouselPrevious className="!static !translate-y-0 rounded-md" />
            <CarouselNext className="!static !translate-y-0 rounded-md" />
          </div>
        </Carousel>

        <QuickServiceBriefDialog
          service={briefService ?? servicesData[0]}
          open={briefService !== null}
          onOpenChange={(open) => {
            if (!open) {
              setBriefService(null);
            }
          }}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
