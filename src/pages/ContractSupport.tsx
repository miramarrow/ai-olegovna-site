import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";

const ContractSupport = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CodeRain />
      <Header />
      <main className="relative z-10 flex-grow pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-8 text-center text-4xl font-bold text-foreground md:text-5xl">
            Шаблон договора на поддержку
          </h1>
          <Card className="space-y-8 rounded-lg p-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">1. Предмет договора</h2>
              <p className="leading-relaxed text-muted-foreground">
                Исполнитель оказывает поддержку сайта, бота для Telegram/MAX, AI-агента, автоматизации, контент-системы или другого цифрового решения Заказчика.
              </p>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">2. Состав поддержки</h2>
              <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
                <li>мониторинг и проверка ключевых сценариев;</li>
                <li>исправление ошибок и небольшие доработки;</li>
                <li>обновление инструкций и документации;</li>
                <li>консультации через Telegram, звонок или систему задач;</li>
                <li>планирование развития проекта.</li>
              </ul>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">3. Формат работы</h2>
              <p className="leading-relaxed text-muted-foreground">
                Объем, сроки реакции, канал связи и стоимость поддержки согласуются отдельно после аудита проекта и фиксируются письменно.
              </p>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">4. Дополнительные работы</h2>
              <p className="leading-relaxed text-muted-foreground">
                Новые крупные функции, изменение архитектуры, новые интеграции и отдельные AI-сценарии оцениваются как самостоятельные задачи.
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
              Шаблон нужно адаптировать под конкретный проект, режим поддержки и юридическую модель работы.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContractSupport;
