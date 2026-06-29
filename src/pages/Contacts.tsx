import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import PromoBanner from "@/components/PromoBanner";
import ProjectDiscussForm from "@/components/ProjectDiscussForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, FileText, Download } from "lucide-react";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <CodeRain />
      <div className="relative z-10">
        <Header />
        
        <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Контакты
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Свяжитесь с нами удобным способом
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:info@company.ru" className="text-muted-foreground hover:text-primary transition-colors inline-block py-2">
                  info@company.ru
                </a>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Телефон</h3>
                <a href="tel:+79932577740" className="text-muted-foreground hover:text-primary transition-colors inline-block py-2">
                  +7 (993) 257-77-40
                </a>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Адрес</h3>
          <p className="text-muted-foreground">
            г. Москва, ул. Примерная, д. 1
          </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-12 px-4 bg-card/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Документы и шаблоны
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Шаблон договора на разработку", file: "contract-development" },
                { name: "Шаблон договора на поддержку", file: "contract-support" },
                { name: "Бриф на разработку сайта", file: "brief-website" },
                { name: "Бриф на Telegram-бота", file: "brief-telegram" },
              ].map((doc) => (
                <a
                  key={doc.file}
                  href={`/documents/${doc.file}`}
                  className="w-full"
                >
                  <Card className="p-6 hover:shadow-lg transition-all group cursor-pointer h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-4 flex-grow">{doc.name}</h3>
                      <Button variant="outline" size="sm" className="gap-2 pointer-events-none mt-auto">
                        <Download className="h-4 w-4" />
                        Открыть
                      </Button>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ProjectDiscussForm />

        <Footer />
      </div>
    </div>
  );
};

export default Contacts;
