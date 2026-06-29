import { ArrowRight, Rocket } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ComingSoon = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <CodeRain />
      <div className="relative z-10">
        <Header />
        <section className="flex min-h-[80vh] items-center justify-center px-4 pb-20 pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <Card className="rounded-lg border border-border bg-card p-10 shadow-sm md:p-14">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-5 text-4xl font-bold md:text-5xl">Раздел готовится</h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Если нужна AI-система, сайт, бот для Telegram/MAX или автоматизация, лучше сразу перейти к умному брифу.
              </p>
              <Button size="lg" className="rounded-md" asChild>
                <a href="/#contact-form">
                  Заполнить бриф
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default ComingSoon;
