import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
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
import { ChevronRight } from "lucide-react";
import { servicesData } from "./servicesData";

const ServiceTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const service = servicesData.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Услуга не найдена</h1>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <CodeRain />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/services" className="hover:text-primary transition-colors">Услуги</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{service.title}</span>
          </nav>

          <div className="grid gap-12 md:grid-cols-[0.9fr_1fr] md:items-center">
            <div>
              <AbstractServiceMark mark={service.mark} className="mb-5 h-10 w-10" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {service.title}
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                {service.description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="rounded-md" onClick={() => setIsBriefOpen(true)}>
                  Обсудить
                </Button>
                <Button variant="outline" size="lg" className="rounded-md" asChild>
                  <a href="#features">Что входит</a>
                </Button>
              </div>
            </div>

            <ServiceAbstractVisual mark={service.mark} className="h-72" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 grid gap-4 md:grid-cols-[0.65fr_1fr] md:items-end">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ключевые возможности
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {service.sectionCopy?.featuresIntro ?? "Собираем состав работ как последовательность решений: что нужно описать, подключить, проверить и передать."}
            </p>
          </div>
          <div className="feature-grid grid gap-4 md:grid-cols-2">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="min-h-[13rem] rounded-md border border-border bg-white p-5"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="font-mono text-sm text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-2 w-2 rotate-45 bg-primary/70" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="bg-secondary px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 grid gap-4 md:grid-cols-[0.65fr_1fr] md:items-end">
            <h2 className="text-3xl md:text-4xl font-bold">
              Примеры использования
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {service.sectionCopy?.examplesIntro ?? "Ниже не обещания “магии”, а типовые рабочие сценарии, которые можно адаптировать под вашу систему."}
            </p>
          </div>
          <Carousel opts={{ align: "start" }} className="case-slider">
            <CarouselContent>
              {service.examples.map((example, index) => (
                <CarouselItem key={index} className="basis-full">
                  <article className="grid gap-6 rounded-md border border-border bg-white p-5 md:p-7 lg:grid-cols-[1fr_0.55fr]">
                    <div>
                      <div className="mb-8 flex items-center gap-4">
                        <span className="font-mono text-sm text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
                      </div>
                      <h3 className="mb-4 text-2xl font-semibold">{example.title}</h3>
                      <p className="leading-relaxed text-muted-foreground">{example.description}</p>
                    </div>
                    <div className="rounded-md border border-primary/20 bg-primary/5 p-5">
                      <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Результат</p>
                      <p className="font-medium leading-relaxed text-foreground">{example.result}</p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-5 flex justify-end gap-3">
              <CarouselPrevious className="!static !translate-y-0 rounded-md" />
              <CarouselNext className="!static !translate-y-0 rounded-md" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={service.faqs} subtitle={service.sectionCopy?.faqIntro} />

      <QuickServiceBriefDialog
        service={service}
        open={isBriefOpen}
        onOpenChange={setIsBriefOpen}
      />

      <Footer />
    </div>
  );
};

export default ServiceTemplate;
