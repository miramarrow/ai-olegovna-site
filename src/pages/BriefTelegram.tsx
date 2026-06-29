import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";

const BriefTelegram = () => {
  const questions = [
    "Платформа: Telegram, MAX или обе",
    "Главный пользовательский сценарий",
    "Нужны ли заявки, статусы, платежи или уведомления",
    "Какие интеграции нужны: CRM, таблицы, сайт, склад, календарь",
    "Какие AI-функции нужны: ответы, классификация, резюме, подсказки",
    "Нужна ли админка, роли, выгрузки или ручное управление",
    "Какие рассылки и уведомления нужны",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CodeRain />
      <Header />
      <main className="relative z-10 flex-grow pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-6 text-center text-4xl font-bold text-foreground md:text-5xl">
            Бриф на бот для Telegram/MAX
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
            Используйте этот шаблон для клиентских сценариев, заявок, поддержки, уведомлений и AI-ответов.
          </p>
          <Card className="space-y-8 rounded-lg p-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Контакты</h2>
              <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
                <li>Имя: _____________________</li>
                <li>Телефон: _____________________</li>
                <li>Telegram: _____________________</li>
              </ul>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">Вопросы</h2>
              <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
                {questions.map((question) => (
                  <li key={question}>{question}: _____________________</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="mb-4 text-2xl font-bold">MAX</h2>
              <p className="text-muted-foreground">
                Для MAX проектируем сценарии, интеграции и автоматизацию под доступные возможности платформы.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BriefTelegram;
