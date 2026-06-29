import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import PricingSection from "@/components/PricingSection";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <CodeRain />
      <div className="relative z-10">
        <Header />
        
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-5">
              Оценка стоимости AI-разработки
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Короткая диагностика помогает понять, с чего начать: нейроофис, агент, контент-завод, сайт, бот или автоматизация.
            </p>
          </div>
        </section>

        <PricingSection />

        <Footer />
      </div>
    </div>
  );
};

export default Pricing;
