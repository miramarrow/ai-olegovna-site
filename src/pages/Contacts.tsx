import { MessageCircle, Phone, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import ProjectDiscussForm from "@/components/ProjectDiscussForm";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const Contacts = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <CodeRain />
      <div className="relative z-10">
        <Header />

        <section className="px-4 pb-10 pt-32">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-5 text-4xl font-bold md:text-6xl">Контакты</h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
              Напишите в Telegram, WhatsApp или заполните умный бриф с ответами по проекту.
            </p>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
            <Card className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10">
                <Send className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-2 font-semibold">Telegram</h2>
              <a href={siteConfig.contacts.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                {siteConfig.contacts.telegramLabel}
              </a>
            </Card>
            <Card className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-2 font-semibold">WhatsApp</h2>
              <a href={siteConfig.contacts.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                {siteConfig.contacts.phoneLabel}
              </a>
            </Card>
            <Card className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10">
                <Phone className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-2 font-semibold">Телефон</h2>
              <a href={siteConfig.contacts.phoneHref} className="text-muted-foreground transition-colors hover:text-primary">
                {siteConfig.contacts.phoneLabel}
              </a>
            </Card>
          </div>
        </section>

        <ProjectDiscussForm />
        <Footer />
      </div>
    </div>
  );
};

export default Contacts;
