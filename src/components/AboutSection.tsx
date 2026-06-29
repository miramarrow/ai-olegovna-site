import { Shield, FileCheck, CreditCard, Code, Zap, HeadphonesIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
const AboutSection = () => {
  const advantages = [{
    icon: Code,
    title: "Код сразу с дизайном",
    description: "Не тратим время на макеты — сразу создаём живой результат, который можно редактировать"
  }, {
    icon: Shield,
    title: "Гарантии и договор",
    description: "Работаем официально по договору с полными гарантиями качества. Профессиональный подход к каждому проекту."
  }, {
    icon: CreditCard,
    title: "Рассрочка от Тбанк",
    description: "Удобная оплата в рассрочку от Тинькофф Банка. Начните проект сейчас, платите частями."
  }, {
    icon: Zap,
    title: "Быстрый старт",
    description: "Минимум времени от идеи до рабочего продукта. Используем современные AI-технологии для ускорения разработки."
  }, {
    icon: FileCheck,
    title: "Чистый код",
    description: "Пишем качественный, масштабируемый код на современном стеке: React, Next.js, Node.js. Никаких конструкторов."
  }, {
    icon: HeadphonesIcon,
    title: "Техподдержка",
    description: "Постоянная техническая поддержка после запуска. Помогаем развивать и масштабировать ваш проект."
  }];
  return <section id="about" className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Почему <span className="text-primary">{siteConfig.name}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Это личный AI-бренд для понятных digital-решений: сайтов, Telegram-инструментов и
            автоматизаций, которые помогают работать быстрее и спокойнее.
          </p>
          <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mt-4">
            🌍 Работаем с клиентами по всему миру
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((advantage, index) => {
          const Icon = advantage.icon;
          return <div key={index} className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              </div>;
        })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <p className="text-xs sm:text-sm font-medium">
              <span className="hidden sm:inline">Более 50+ успешных проектов • Безналичный расчет онлайн</span>
              <span className="sm:hidden">50+ проектов • Онлайн оплата</span>
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;
