import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight } from "lucide-react";

const InstallmentBanner = () => {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
          <div className="p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <span className="text-2xl font-bold">Т-Банк</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Оплата в рассрочку
              </h3>
              
              <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6">
                Разделите платеж на удобные части без переплат. Рассрочка до 12 месяцев от Т-Банка
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span>Без первоначального взноса</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span>0% переплаты</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span>Быстрое одобрение</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 md:shrink-0">
              <Button size="lg" className="gap-2 py-6" asChild>
                <a href="/#contact-form">
                  Узнать условия
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                * Условия предоставляет Т-Банк
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        </Card>
      </div>
    </section>
  );
};

export default InstallmentBanner;
