import { Bot, Phone, Calendar, Mail, Target, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import n8nImage from "@/assets/services/n8n-automation.png";
import websiteImage from "@/assets/services/website-development.png";
import supportImage from "@/assets/services/technical-support.mp4";
import telegramBotImage from "@/assets/services/telegram-bots.png";
import aiContentImage from "@/assets/services/ai-content-new.jpg";
import aiVideoImage from "@/assets/services/ai-video.mp4";
import miniappImage from "@/assets/services/telegram-miniapp.mp4";
import webServicesImage from "@/assets/services/web-services.jpg";

const ServicesSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const services = [
    {
      id: "n8n-automation",
      icon: Bot,
      image: n8nImage,
      title: "N8N Автоматизация",
      description: "Связываем ваши сервисы в единую систему. Автоматизируем обработку лидов, синхронизацию данных, отчёты — экономьте до 40 часов в неделю.",
      slug: "n8n-automation"
    },
    {
      id: "website-development",
      icon: Layers,
      image: websiteImage,
      title: "Разработка Сайтов",
      description: "Создаём сайты, которые работают на результат. От лендингов до интернет-магазинов. Адаптивный дизайн, быстрая загрузка, SEO с первого дня.",
      slug: "website-development"
    },
    {
      id: "telegram-bots",
      icon: Bot,
      image: telegramBotImage,
      title: "Telegram Боты",
      description: "Боты для продаж, поддержки и автоматизации. Приём заказов 24/7, рассылки, интеграция с CRM. От идеи до запуска за 1–2 недели.",
      slug: "telegram-bots"
    },
    {
      id: "ai-content",
      icon: Target,
      image: aiContentImage,
      title: "AI Генерация Контента",
      description: "GPT-5, Claude и Midjourney для вашего бизнеса. Генерируем тексты, изображения, идеи — ускоряем создание контента в 10 раз.",
      slug: "ai-content"
    },
    {
      id: "telegram-miniapp",
      icon: Mail,
      image: miniappImage,
      title: "Telegram Mini App",
      description: "Полноценные веб-приложения внутри Telegram. Каталоги товаров, игры, сервисы с оплатой. Доступ к 800+ млн пользователей без установки.",
      slug: "telegram-miniapp"
    },
    {
      id: "web-services",
      icon: Layers,
      image: webServicesImage,
      title: "Web Сервисы",
      description: "Специализированные платформы и SaaS-решения под ключ. Автоматизация уникальных процессов вашего бизнеса с масштабируемой архитектурой.",
      slug: "web-services"
    },
    {
      id: "ai-video",
      icon: Calendar,
      image: aiVideoImage,
      title: "AI Генерация Видео",
      description: "Видеоконтент для маркетинга и соцсетей на базе AI. Создаём ролики за минуты вместо часов — идеально для рекламы и продвижения.",
      slug: "ai-video"
    },
    {
      id: "technical-support",
      icon: Phone,
      image: supportImage,
      title: "Техническая Поддержка",
      description: "Полное сопровождение ваших проектов. Мониторинг 24/7, обновления, резервное копирование. Быстрая реакция на инциденты от 15 000₽/мес.",
      slug: "technical-support"
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            Наши услуги
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Услуги <span className="text-primary">Разработки и Автоматизации</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Полный спектр современных цифровых решений для вашего бизнеса
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {services.map((service) => (
                <CarouselItem key={service.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="group relative bg-card backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden h-full hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
                    {/* Image/Video */}
                    <div className="relative h-64 overflow-hidden">
                      {service.id === "technical-support" || service.id === "ai-video" || service.id === "telegram-miniapp" ? (
                        <video 
                          src={service.image} 
                          autoPlay
                          loop
                          muted
                          playsInline
                          webkit-playsinline="true"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                        {service.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex gap-2">
                        <Button className="flex-1 h-11 group" asChild>
                          <a href="/#contact-form" className="flex items-center justify-center gap-1">
                            <span>Заказать</span>
                            <ArrowRight className="h-4 w-4 hidden md:inline transition-transform group-hover:translate-x-1" />
                          </a>
                        </Button>
                        <Button variant="outline" className="flex-1 h-11 group" asChild>
                          <Link to={`/services/${service.slug}`} className="flex items-center justify-center gap-1">
                            <span>Подробнее</span>
                            <ArrowRight className="h-4 w-4 hidden md:inline transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Decorative gradient */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="-left-4 sm:-left-12 md:-left-20 h-10 w-10 md:h-14 md:w-14 border-2 border-primary/20 bg-card/80 backdrop-blur-sm hover:bg-primary hover:border-primary shadow-lg" />
            <CarouselNext className="-right-4 sm:-right-12 md:-right-20 h-10 w-10 md:h-14 md:w-14 border-2 border-primary/20 bg-card/80 backdrop-blur-sm hover:bg-primary hover:border-primary shadow-lg" />
          </Carousel>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>

          {/* All Services Button - Mobile */}
          <div className="flex md:hidden justify-center mt-6">
            <Button size="lg" className="w-full max-w-sm" asChild>
              <Link to="/services">
                Все услуги
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    </section>
  );
};

export default ServicesSection;
