import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import PromoBanner from "@/components/PromoBanner";
import { Card } from "@/components/ui/card";
import { Rocket, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ComingSoon = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Спасибо за подписку!",
        description: "Мы сообщим вам о запуске новых сервисов",
      });
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <CodeRain />
      <div className="relative z-10">
        <Header />
        
        <section className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 md:p-16 bg-card/50 backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-8 animate-bounce">
                <Rocket className="h-12 w-12 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Сервисы скоро появятся
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Мы готовим для вас набор крутых сервисов, которые будут полезны каждому. Инновационные решения для автоматизации, AI-инструменты и многое другое!
              </p>
              
              <div className="space-y-4 text-muted-foreground mb-8">
                <p className="text-lg font-semibold">Что вас ждет:</p>
                <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="font-medium mb-2">🤖 AI-ассистенты</p>
                    <p className="text-sm">Умные помощники для бизнеса и личного использования</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="font-medium mb-2">⚡ Инструменты автоматизации</p>
                    <p className="text-sm">Готовые решения для типовых задач</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="font-medium mb-2">📊 Аналитические платформы</p>
                    <p className="text-sm">Сбор и анализ данных в реальном времени</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="font-medium mb-2">🔗 Интеграционные хабы</p>
                    <p className="text-sm">Связываем ваши сервисы в единую систему</p>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" className="gap-2">
                    <Bell className="h-4 w-4" />
                    Узнать первым
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-3">
                  Подпишитесь, чтобы узнать о запуске первыми
                </p>
              </div>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default ComingSoon;
