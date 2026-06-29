import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";

const ContractDevelopment = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CodeRain />
      <Header />
      
      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Шаблон договора на разработку
          </h1>
          
          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Предмет договора</h2>
              <p className="text-muted-foreground leading-relaxed">
                Исполнитель обязуется по заданию Заказчика выполнить работы по разработке [указать вид работ: веб-сайта, 
                Telegram-бота, системы автоматизации и т.д.], а Заказчик обязуется принять и оплатить выполненные работы.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Техническое задание</h2>
              <p className="text-muted-foreground mb-3">Разработка осуществляется в соответствии с техническим заданием, включающим:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Описание функциональных требований</li>
                <li>Дизайн-макеты и прототипы (при наличии)</li>
                <li>Технические характеристики и требования</li>
                <li>Сроки выполнения работ по этапам</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Стоимость и порядок оплаты</h2>
              <p className="text-muted-foreground mb-3">Стоимость работ составляет: [сумма] рублей.</p>
              <p className="text-muted-foreground mb-3">Оплата производится в следующем порядке:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Предоплата 50% от общей суммы - после подписания договора</li>
                <li>Оплата 50% от общей суммы - после сдачи работ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Сроки выполнения работ</h2>
              <p className="text-muted-foreground leading-relaxed">
                Срок выполнения работ составляет [количество] рабочих дней с момента получения предоплаты 
                и утверждения технического задания. Конкретные сроки по этапам указываются в техническом задании.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Права и обязанности сторон</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.1. Исполнитель обязуется:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Выполнить работы качественно и в установленные сроки</li>
                    <li>Согласовывать с Заказчиком промежуточные результаты</li>
                    <li>Предоставить документацию по завершению работ</li>
                    <li>Обеспечить конфиденциальность полученной информации</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.2. Заказчик обязуется:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Своевременно предоставлять необходимые материалы и информацию</li>
                    <li>Произвести оплату в установленные сроки</li>
                    <li>Принять выполненные работы при соответствии техническому заданию</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Приёмка работ</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                После завершения работ Исполнитель направляет Заказчику акт выполненных работ. 
                Заказчик обязан в течение 3 (трёх) рабочих дней с момента получения акта:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Подписать акт и произвести оплату, либо</li>
                <li>Направить мотивированный отказ с указанием недостатков</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Гарантии</h2>
              <p className="text-muted-foreground leading-relaxed">
                Исполнитель предоставляет гарантию на выполненные работы сроком [срок] месяцев с момента подписания 
                акта выполненных работ. В гарантийный период Исполнитель обязуется бесплатно устранить выявленные 
                недостатки, возникшие по вине Исполнителя.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Интеллектуальная собственность</h2>
              <p className="text-muted-foreground leading-relaxed">
                Исключительные права на результат работ переходят к Заказчику после полной оплаты работ 
                и подписания акта выполненных работ.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Ответственность сторон</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                За неисполнение или ненадлежащее исполнение обязательств по настоящему договору стороны несут 
                ответственность в соответствии с действующим законодательством Российской Федерации.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Срок действия и расторжение договора</h2>
              <p className="text-muted-foreground leading-relaxed">
                Договор вступает в силу с момента подписания и действует до полного исполнения сторонами своих обязательств. 
                Договор может быть расторгнут по соглашению сторон или в судебном порядке.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Реквизиты и подписи сторон</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Исполнитель:</h3>
                  <div className="text-muted-foreground space-y-1 text-sm">
                    <p>ИП / ООО _________________</p>
                    <p>ИНН: _____________________</p>
                    <p>Адрес: ___________________</p>
                    <p>Тел: ______________________</p>
                    <p className="mt-4">_____________ / ___________ /</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Заказчик:</h3>
                  <div className="text-muted-foreground space-y-1 text-sm">
                    <p>_________________________</p>
                    <p>ИНН: _____________________</p>
                    <p>Адрес: ___________________</p>
                    <p>Тел: ______________________</p>
                    <p className="mt-4">_____________ / ___________ /</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-6 border-t text-sm text-muted-foreground">
              <p className="italic">Примечание: Это шаблон договора. Перед использованием рекомендуется адаптировать его под конкретный проект и проконсультироваться с юристом.</p>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContractDevelopment;
