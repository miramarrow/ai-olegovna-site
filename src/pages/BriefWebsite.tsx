import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const sections = [
  {
    title: "1. Направление",
    items: ["нейроофис", "AI-агент", "контент-завод", "автоматизация", "сайт", "бот для Telegram/MAX", "MAX-автоматизация", "поддержка"],
  },
  {
    title: "2. Контакты",
    items: ["имя и роль", "телефон", "Telegram", "удобный способ связи"],
  },
  {
    title: "3. Задача",
    items: ["какой результат нужен", "кто будет пользоваться решением", "что уже есть", "какие ограничения важны"],
  },
  {
    title: "4. Интеграции",
    items: ["CRM", "таблицы", "сайт", "Telegram/MAX", "платежи", "документы", "внутренние сервисы"],
  },
  {
    title: "5. Старт",
    items: ["хочу понять объем", "нужен быстрый запуск", "есть готовое ТЗ", "нужна система под ключ"],
  },
];

const BriefWebsite = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CodeRain />
      <Header />
      <main className="relative z-10 flex-grow pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-6 text-center text-4xl font-bold text-foreground md:text-5xl">
            Бриф на AI-систему и сайт
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
            Универсальная структура для первичного описания проекта {siteConfig.name}: сайт, нейроофис, AI-агент, контент-завод или автоматизация.
          </p>
          <Card className="space-y-8 rounded-lg p-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item}>{item}: _____________________</li>
                  ))}
                </ul>
              </section>
            ))}
            <section>
              <h2 className="mb-4 text-2xl font-bold">6. Комментарии</h2>
              <p className="text-muted-foreground">Что еще важно учесть: _____________________</p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BriefWebsite;
