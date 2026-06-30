import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CodeRain />
      <Header />

      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Пользовательское соглашение
          </h1>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Общие условия</h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящее Пользовательское соглашение регулирует использование сайта проекта{" "}
                <strong>{siteConfig.name}</strong>. Посещая сайт, отправляя заявку или переходя по ссылкам связи, вы
                соглашаетесь с условиями этого документа.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Назначение сайта</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сайт предоставляет информацию об услугах в области разработки, автоматизации, Telegram/MAX-решений и
                внедрения AI-инструментов. Материалы сайта носят информационный характер и не являются публичной
                офертой, если прямо не указано иное.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Обращения и заявки</h2>
              <p className="text-muted-foreground leading-relaxed">
                Пользователь может отправить заявку через форму или перейти во внешний сервис связи. Условия,
                стоимость, сроки и состав конкретной работы согласуются отдельно в переписке, счете, договоре или
                ином письменном подтверждении.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Права и обязанности пользователя</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>использовать сайт законным способом;</li>
                <li>передавать достоверные контактные данные при обращении;</li>
                <li>не пытаться нарушить работу сайта или получить несанкционированный доступ;</li>
                <li>не копировать материалы сайта для коммерческого использования без согласия правообладателя.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Права проекта</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>обновлять содержание сайта и условия настоящего Соглашения;</li>
                <li>изменять перечень услуг, форматы консультаций и способы связи;</li>
                <li>не отвечать на обращения, содержащие спам, мошенничество или незаконные требования;</li>
                <li>ограничивать доступ к сайту при угрозе безопасности или злоупотреблениях.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Интеллектуальная собственность</h2>
              <p className="text-muted-foreground leading-relaxed">
                Тексты, дизайн, визуальные материалы, структура страниц и программный код сайта охраняются законом.
                Использование материалов допускается только для личного ознакомления, если другое не согласовано
                письменно.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Ограничение ответственности</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сайт предоставляется в текущем виде. Проект не отвечает за временную недоступность сайта, работу
                внешних сервисов связи, действия третьих лиц и последствия использования информации без отдельной
                консультации по конкретной ситуации.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Персональные данные</h2>
              <p className="text-muted-foreground leading-relaxed">
                Обработка данных описана в{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Политике конфиденциальности
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Изменение условий</h2>
              <p className="text-muted-foreground leading-relaxed">
                Новая редакция Соглашения вступает в силу после публикации на этой странице. Продолжение
                использования сайта означает согласие с актуальной редакцией.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Контакты</h2>
              <p className="text-muted-foreground leading-relaxed">
                По вопросам, связанным с сайтом и настоящим Соглашением, можно связаться с проектом {siteConfig.name}:
              </p>
              <ul className="text-muted-foreground space-y-2 mt-3">
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

export default Terms;
