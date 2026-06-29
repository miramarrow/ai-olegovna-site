import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import LaunchProcessSection from "@/components/LaunchProcessSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ProjectDiscussForm from "@/components/ProjectDiscussForm";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import MobileBriefCta from "@/components/MobileBriefCta";
const Index = () => {
  
  const generalFaqs = [
    {
      question: "Какие технологии вы используете?",
      answer: "Используем React, Node.js, Python, n8n, OpenAI API, Telegram-интеграции и другие инструменты. Для MAX проектируем сценарии под доступные возможности платформы."
    },
    {
      question: "Сколько времени займет разработка?",
      answer: "Срок зависит от объема, готовности материалов, интеграций и срочности. После умного брифа предложу реалистичный формат старта."
    },
    {
      question: "Предоставляете ли вы техническую поддержку?",
      answer: "Да. Поддержка может быть разовой, регулярной или встроенной в запуск системы под ключ."
    },
    {
      question: "Можно ли внести изменения в проект после завершения?",
      answer: "Да. AI-системы лучше развивать по этапам: сначала запуск, затем улучшение сценариев по реальным данным."
    },
    {
      question: "Как происходит оплата?",
      answer: "Формат оплаты обсуждается после оценки объема. Для крупных задач удобно делить работу на понятные этапы."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <CodeRain intensity="home" />
      <div className="relative z-10">
        <Header />
        <Hero />
        <AboutSection />
        <ServicesSection />
        <LaunchProcessSection />
        <PricingSection />
        <FAQSection faqs={generalFaqs} />
        <ProjectDiscussForm />
        <Footer />
        <MobileBriefCta />
      </div>
    </div>
  );
};

export default Index;
