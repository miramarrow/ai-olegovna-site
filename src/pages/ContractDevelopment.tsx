import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";

const ContractDevelopment = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CodeRain />
      <Header />
      <main className="relative z-10 flex-grow pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-8 text-center text-4xl font-bold text-foreground md:text-5xl">
            Шаблон договора на разработку
          </h1>
          <Card className="space-y-8 rounded-lg p-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">1. Предмет договора</h2>
              <p className="leading-relaxed text-muted-foreground">
                Исполнитель выполняет работы по разработке AI-системы, сайта, нейроофиса, AI-агента, контент-завода, автоматизации, бота для Telegram/MAX или другого цифрового решения по согласованному заданию.
              </p>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">2. Задание и этапы</h2>
              <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
                <li>описание цели и результата проекта;</li>
                <li>перечень сценариев, интеграций и ограничений;</li>
                <li>сроки и порядок согласования этапов;</li>
                <li>порядок передачи материалов, доступов и результата работ.</li>
              </ul>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">3. Оплата</h2>
              <p className="leading-relaxed text-muted-foreground">
                Стоимость и порядок оплаты согласуются отдельно после оценки объема работ и фиксируются в приложении, счете или ином письменном подтверждении.
              </p>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">4. Приемка и поддержка</h2>
              <p className="leading-relaxed text-muted-foreground">
                Результат передается после проверки согласованных сценариев. Гарантийные исправления и дальнейшее развитие проекта описываются отдельным разделом или договором поддержки.
              </p>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">5. Реквизиты сторон</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Исполнитель</p>
                  <p>Наименование: _____________________</p>
                  <p>ИНН: _____________________</p>
                  <p>Телефон: _____________________</p>
                  <p>Подпись: _____________________</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Заказчик</p>
                  <p>Наименование: _____________________</p>
                  <p>ИНН: _____________________</p>
                  <p>Телефон: _____________________</p>
                  <p>Подпись: _____________________</p>
                </div>
              </div>
            </section>
            <p className="border-t pt-6 text-sm italic text-muted-foreground">
              Шаблон нужно адаптировать под конкретный проект и юридическую модель работы.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContractDevelopment;
