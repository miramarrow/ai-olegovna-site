import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";

const ContractSupport = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CodeRain />
      <Header />
      
      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Шаблон договора на техническую поддержку
          </h1>
          
          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Предмет договора</h2>
              <p className="text-muted-foreground leading-relaxed">
                Исполнитель обязуется оказывать Заказчику услуги по технической поддержке и сопровождению 
                [указать объект: веб-сайта, бота, системы автоматизации и т.д.], а Заказчик обязуется 
                оплачивать данные услуги в порядке и на условиях, предусмотренных настоящим договором.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Виды услуг технической поддержки</h2>
              <p className="text-muted-foreground mb-3">В рамках технической поддержки Исполнитель осуществляет:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Мониторинг работоспособности системы</li>
                <li>Устранение технических неполадок и ошибок</li>
                <li>Консультации по использованию системы</li>
                <li>Обновление программного обеспечения и зависимостей</li>
                <li>Резервное копирование данных</li>
                <li>Внесение небольших изменений и доработок</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Уровни поддержки</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">3.1. Базовый уровень</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Время реакции: до 24 часов</li>
                    <li>Время устранения критических ошибок: до 48 часов</li>
                    <li>Консультации: email</li>
                    <li>Стоимость: [сумма] руб/месяц</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">3.2. Стандартный уровень</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Время реакции: до 12 часов</li>
                    <li>Время устранения критических ошибок: до 24 часов</li>
                    <li>Консультации: email, Telegram</li>
                    <li>Стоимость: [сумма] руб/месяц</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">3.3. Премиум уровень</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Время реакции: до 4 часов</li>
                    <li>Время устранения критических ошибок: до 12 часов</li>
                    <li>Консультации: email, Telegram, видеосвязь</li>
                    <li>Приоритетная обработка запросов</li>
                    <li>Стоимость: [сумма] руб/месяц</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Стоимость и порядок оплаты</h2>
              <p className="text-muted-foreground mb-3">
                Стоимость услуг зависит от выбранного уровня поддержки и составляет [сумма] рублей в месяц.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Оплата производится ежемесячно до 5-го числа текущего месяца на основании выставленного счета.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Права и обязанности сторон</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.1. Исполнитель обязуется:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Оперативно реагировать на обращения в соответствии с выбранным уровнем поддержки</li>
                    <li>Обеспечивать конфиденциальность полученной информации</li>
                    <li>Информировать Заказчика о выявленных проблемах и рисках</li>
                    <li>Вести учет выполненных работ</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.2. Заказчик обязуется:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Своевременно оплачивать услуги</li>
                    <li>Предоставлять необходимую информацию для решения проблем</li>
                    <li>Согласовывать критичные изменения перед их внесением</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Время работы и каналы связи</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Техническая поддержка осуществляется в рабочие дни с 10:00 до 19:00 (МСК). 
                Обращения, поступившие вне рабочего времени, обрабатываются в следующий рабочий день.
              </p>
              <p className="text-muted-foreground mb-2">Каналы связи:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Email: support@company.ru</li>
                <li>Telegram: @company_support</li>
                <li>Система тикетов (при наличии)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Дополнительные работы</h2>
              <p className="text-muted-foreground leading-relaxed">
                Работы, выходящие за рамки технической поддержки (значительные доработки, добавление нового функционала), 
                оплачиваются отдельно по согласованию сторон. Стоимость таких работ рассчитывается индивидуально.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Ответственность сторон</h2>
              <p className="text-muted-foreground leading-relaxed">
                За неисполнение или ненадлежащее исполнение обязательств по настоящему договору стороны несут 
                ответственность в соответствии с действующим законодательством Российской Федерации.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Срок действия и расторжение договора</h2>
              <p className="text-muted-foreground leading-relaxed">
                Договор заключается на срок [период] с момента подписания и автоматически продлевается на тот же срок, 
                если ни одна из сторон не заявит о расторжении договора за 10 дней до окончания срока его действия.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Отчетность</h2>
              <p className="text-muted-foreground leading-relaxed">
                По окончании каждого месяца Исполнитель предоставляет Заказчику отчет о выполненных работах 
                с указанием затраченного времени и описанием решенных задач.
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
              <p className="italic">Примечание: Это шаблон договора. Перед использованием рекомендуется адаптировать его под конкретные условия и проконсультироваться с юристом.</p>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContractSupport;
