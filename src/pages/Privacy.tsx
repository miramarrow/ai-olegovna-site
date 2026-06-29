import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CodeRain />
      <Header />

      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Политика конфиденциальности
          </h1>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Общие положения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящая Политика конфиденциальности описывает, как проект <strong>Ai, Олеговна!</strong>{" "}
                обрабатывает данные посетителей сайта. Используя сайт, вы подтверждаете, что ознакомились с
                настоящей Политикой.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Какие данные могут обрабатываться</h2>
              <p className="text-muted-foreground mb-3">
                Сайт может получать данные, которые вы добровольно передаете при обращении:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>имя или обращение;</li>
                <li>email, телефон, Telegram или другой способ связи;</li>
                <li>описание задачи, проекта или вопроса;</li>
                <li>технические сведения о работе сайта, если они нужны для безопасности и аналитики.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Зачем используются данные</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>чтобы ответить на заявку или сообщение;</li>
                <li>чтобы подготовить консультацию, оценку или предложение по проекту;</li>
                <li>чтобы улучшать содержание и удобство сайта;</li>
                <li>чтобы выполнять требования закона, если они применимы.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Передача данных</h2>
              <p className="text-muted-foreground leading-relaxed">
                Данные не продаются третьим лицам. Передача возможна только если это нужно для обработки обращения,
                работы сервисов связи, исполнения договора, защиты прав проекта или выполнения требований закона.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Хранение и защита</h2>
              <p className="text-muted-foreground leading-relaxed">
                Данные хранятся столько, сколько необходимо для ответа на обращение, обсуждения проекта и выполнения
                связанных обязательств. Для защиты используются разумные организационные и технические меры.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Права пользователя</h2>
              <p className="text-muted-foreground mb-3">Вы можете запросить:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>уточнение ваших данных;</li>
                <li>ограничение обработки;</li>
                <li>удаление данных, если нет законных оснований продолжать хранение;</li>
                <li>информацию о том, какие данные были переданы через сайт.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cookie и внешние сервисы</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сайт может использовать технические cookie и внешние сервисы связи, например Telegram или WhatsApp.
                При переходе во внешние сервисы действуют их собственные правила обработки данных.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Изменения Политики</h2>
              <p className="text-muted-foreground leading-relaxed">
                Политика может обновляться при изменении сайта, способов связи или требований закона. Актуальная
                редакция публикуется на этой странице.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Контакты</h2>
              <p className="text-muted-foreground leading-relaxed">
                По вопросам обработки данных можно связаться с проектом {siteConfig.name}:
              </p>
              <ul className="text-muted-foreground space-y-2 mt-3">
                <li><strong>Email:</strong> {siteConfig.contacts.email}</li>
                <li><strong>Telegram:</strong> {siteConfig.contacts.telegramLabel}</li>
              </ul>
            </section>

            <div className="pt-6 border-t text-sm text-muted-foreground">
              <p><strong>Дата последнего обновления:</strong> {new Date().toLocaleDateString("ru-RU")}</p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
