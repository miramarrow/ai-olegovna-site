import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const Privacy = () => {
  const operator = siteConfig.operator;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CodeRain />
      <Header />

      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Информация о данных на сайте
          </h1>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Владелец сайта</h2>
              <p className="text-muted-foreground leading-relaxed">
                Информационный сайт <strong>{siteConfig.name}</strong> ({siteConfig.domain}) принадлежит {operator.legalName}.
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li><strong>{operator.inn}</strong></li>
                <li><strong>{operator.ogrnip}</strong></li>
                <li><strong>Регистрация:</strong> {operator.registrationAuthority}</li>
                <li><strong>Местонахождение:</strong> {operator.publicAddress}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Информационный режим</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сайт не использует формы, личные кабинеты, комментарии, подписки и другие инструменты,
                через которые посетитель мог бы передать владельцу сайта имя, телефон, адрес электронной
                почты или иные персональные данные.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Технические журналы</h2>
              <p className="text-muted-foreground leading-relaxed">
                Для доставки страниц, диагностики сбоев и защиты инфраструктуры сервер и хостинг-провайдер
                могут автоматически фиксировать технические сведения: IP-адрес, тип браузера, дату и время
                запроса, запрошенный URL и код ответа. Эти сведения не используются для обратной связи,
                рекламы или составления пользовательских профилей.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Аналитика и cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сайт не использует системы веб-аналитики и не устанавливает необязательные cookie.
                Браузер или инфраструктурные сервисы могут применять только технические механизмы,
                необходимые для безопасной передачи и отображения страниц.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Внешние сервисы</h2>
              <p className="text-muted-foreground leading-relaxed">
                На сайте нет отправки данных в мессенджеры, CRM, таблицы или рекламные системы. Обработка
                технических сведений хостинг-провайдером возможна в объёме, необходимом для работы и защиты
                сайта.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Изменения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Если на сайте появятся формы, аналитика, подписки или другие способы получения данных,
                эта страница будет обновлена до запуска таких функций.
              </p>
            </section>

            <div className="pt-6 border-t text-sm text-muted-foreground">
              <p><strong>Дата последнего обновления:</strong> {siteConfig.legal.updatedAt}</p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
