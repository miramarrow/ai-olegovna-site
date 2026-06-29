import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import PromoBanner from "@/components/PromoBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import n8nImage from "@/assets/services/n8n-automation.png";
import websiteImage from "@/assets/services/website-development.png";
import supportImage from "@/assets/services/technical-support.mp4";
import telegramBotImage from "@/assets/services/telegram-bots.png";
import miniappImage from "@/assets/services/telegram-miniapp.mp4";
import aiContentImage from "@/assets/services/ai-content-new.jpg";
import aiVideoImage from "@/assets/services/ai-video.mp4";
import webServicesImage from "@/assets/services/web-services.jpg";

const Services = () => {
  const services = [
    {
      id: "n8n-automation",
      title: "N8N Автоматизация",
      description: "Создание автоматизированных бизнес-процессов без программирования. Интеграция сервисов, обработка данных и автоматизация рутинных задач.",
      image: n8nImage,
    },
    {
      id: "website-development",
      title: "Разработка сайтов",
      description: "Создание современных веб-сайтов: от лендингов до сложных корпоративных порталов. Адаптивный дизайн и оптимизация под поисковики.",
      image: websiteImage,
    },
    {
      id: "technical-support",
      title: "Техническая поддержка",
      description: "Постоянная техническая поддержка ваших проектов. Исправление ошибок, консультации, обновления и мониторинг работоспособности.",
      image: supportImage,
    },
    {
      id: "telegram-bots",
      title: "Разработка Telegram ботов",
      description: "Разработка умных ботов для автоматизации бизнеса в Telegram. От простых информационных до сложных интеграционных решений.",
      image: telegramBotImage,
    },
    {
      id: "telegram-miniapp",
      title: "Telegram Mini App",
      description: "Создание полноценных веб-приложений внутри Telegram. Современный интерфейс и бесшовная интеграция с мессенджером.",
      image: miniappImage,
    },
    {
      id: "ai-content",
      title: "AI Контент-генерация",
      description: "Внедрение AI для автоматической генерации контента. Тексты, изображения, аналитика с использованием нейросетей.",
      image: aiContentImage,
    },
    {
      id: "ai-video",
      title: "AI Видео-обработка",
      description: "Обработка видео с помощью искусственного интеллекта. Субтитры, монтаж, анализ контента и автоматизация производства.",
      image: aiVideoImage,
    },
    {
      id: "web-services",
      title: "Веб-сервисы и API",
      description: "Разработка RESTful API и веб-сервисов для интеграции систем. Масштабируемые решения для бизнеса любого уровня.",
      image: webServicesImage,
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <CodeRain />
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Наши услуги
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Полный спектр IT-решений для вашего бизнеса: от автоматизации процессов до разработки сложных веб-приложений
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    {service.image.endsWith('.mp4') ? (
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
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                  
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {service.description}
                </p>
                <Button variant="outline" className="w-full group/btn py-5" asChild>
                  <Link to={`/services/${service.id}`}>
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-br from-primary/10 to-background border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Не нашли нужную услугу?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Мы разработаем индивидуальное решение специально для ваших задач
              </p>
              <Button size="lg" asChild>
                <Link to="/#contact-form">
                  Обсудить проект
                </Link>
              </Button>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Services;
