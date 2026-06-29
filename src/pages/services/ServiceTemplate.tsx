import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import CodeRain from "@/components/CodeRain";
import ServiceConsultationDialog from "@/components/ServiceConsultationDialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { servicesData } from "./servicesData";
import { useState, useEffect } from "react";

const ServiceTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find(s => s.slug === slug);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Сбрасываем скролл в начало при загрузке страницы
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background relative">
      <CodeRain />
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : ''}`}>
        <Header />
      </div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/services" className="hover:text-primary transition-colors">Услуги</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{service.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {service.title}
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                {service.description}
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => setIsDialogOpen(true)}>
                  Получить консультацию
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#features">Что входит</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              {service.image.endsWith('.mp4') ? (
                <video 
                  src={service.image} 
                  autoPlay
                  loop
                  muted
                  playsInline
                  webkit-playsinline="true"
                  className="w-full aspect-video object-cover rounded-2xl border border-primary/20 shadow-2xl"
                />
              ) : (
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full aspect-video object-cover rounded-2xl border border-primary/20 shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Ключевые возможности
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Примеры использования
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {service.examples.map((example, index) => (
              <div
                key={index}
                className="bg-card/50 border border-border rounded-xl p-8"
              >
                <h3 className="text-2xl font-semibold mb-4">{example.title}</h3>
                <p className="text-muted-foreground mb-4">{example.description}</p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-primary font-medium">
                    Результат: {example.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={service.faqs} />

      {/* Contact Form */}
      <ContactForm />

      {/* Consultation Dialog */}
      <ServiceConsultationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        serviceTitle={service.title}
      />

      <Footer />
    </div>
  );
};

export default ServiceTemplate;
