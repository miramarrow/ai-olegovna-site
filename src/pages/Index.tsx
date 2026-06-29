import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import InstallmentBanner from "@/components/InstallmentBanner";
import FAQSection from "@/components/FAQSection";
import ProjectDiscussForm from "@/components/ProjectDiscussForm";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import Aurora from "@/components/Aurora";
const Index = () => {
  
  const generalFaqs = [
    {
      question: "Какие технологии вы используете?",
      answer: "Мы работаем с современными технологиями: React, Node.js, Python, N8N, Telegram API, OpenAI API и другими. Выбираем оптимальный стек под конкретные задачи вашего проекта."
    },
    {
      question: "Сколько времени займет разработка?",
      answer: "Сроки зависят от сложности проекта. Простой сайт или бот — от 1–2 недель. Комплексная система автоматизации — от 1–3 месяцев. Точные сроки определяем после детального анализа требований."
    },
    {
      question: "Предоставляете ли вы техническую поддержку?",
      answer: "Да, мы предоставляем техническую поддержку на всех тарифах. Длительность и условия зависят от выбранного плана — от 1 до 12 месяцев включено в стоимость разработки."
    },
    {
      question: "Можно ли внести изменения в проект после завершения?",
      answer: "Конечно! Мы всегда открыты для доработок и модификаций. Небольшие правки возможны в рамках гарантийного периода, крупные изменения обсуждаются и оцениваются отдельно."
    },
    {
      question: "Как происходит оплата?",
      answer: "Работаем по официальному договору. Оплата поэтапная: предоплата 30–50%, промежуточные платежи по этапам разработки, окончательный расчет после сдачи проекта. Доступна рассрочка от Т-Банка на 6 и 12 месяцев."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Aurora />
      <CodeRain />
      <div className="relative z-10">
        <Header />
        <Hero />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <InstallmentBanner />
        <FAQSection faqs={generalFaqs} />
        <ProjectDiscussForm />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
