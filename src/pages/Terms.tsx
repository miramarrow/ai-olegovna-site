import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const Terms = () => {
  const operator = siteConfig.operator;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CodeRain />
      <Header />

      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Условия использования сайта
          </h1>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Владелец сайта</h2>
              <p className="text-muted-foreground leading-relaxed">
                Владельцем сайта <strong>{siteConfig.name}</strong> ({siteConfig.domain}) является {operator.legalName}.
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li><strong>{operator.inn}</strong></li>
                <li><strong>{operator.ogrnip}</strong></li>
                <li><strong>Регистрация:</strong> {operator.registrationAuthority}</li>
                <li><strong>Местонахождение:</strong> {operator.publicAddress}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Назначение сайта</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сайт знакомит посетителей с направлениями разработки AI-систем, сайтов, ботов,
                автоматизаций и контент-систем. Материалы опубликованы только в информационных целях
                и не являются публичной офертой.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Стоимость и условия проектов</h2>
              <p className="text-muted-foreground leading-relaxed">
                Примеры, этапы и принципы оценки на сайте носят ориентировочный характер. Состав работ,
                сроки, цена и порядок оплаты приобретают обязательную силу только после отдельного
                письменного согласования сторонами.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Использование материалов</h2>
              <p className="text-muted-foreground leading-relaxed">
                Тексты, дизайн, визуальные материалы, структура страниц и программный код охраняются
                законодательством. Материалы можно использовать для личного ознакомления. Публикация,
                переработка или коммерческое использование требуют разрешения правообладателя.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Ограничение ответственности</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сайт предоставляется в текущем виде. Владелец не гарантирует непрерывную доступность и не
                несёт ответственности за решения, принятые посетителем исключительно на основании общих
                информационных материалов сайта.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Технические данные</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сведения о технической работе сайта и отсутствии пользовательских форм описаны на странице
                <a href="/privacy" className="ml-1 text-primary hover:underline">
                  «Информация о данных на сайте»
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Изменение условий</h2>
              <p className="text-muted-foreground leading-relaxed">
                Актуальная редакция действует с момента публикации на этой странице. Условия могут быть
                обновлены при изменении содержания или функций сайта.
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

export default Terms;
