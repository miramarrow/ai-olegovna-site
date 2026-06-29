import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";

const BriefTelegram = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CodeRain />
      <Header />
      
      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Бриф на разработку Telegram-бота
          </h1>
          
          <Card className="p-8 space-y-8">
            <section>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Заполнение брифа поможет нам точно понять ваши задачи и разработать бота, который решит ваши бизнес-задачи.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Общая информация</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">1.1. О проекте</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Название проекта/компании: _____________________</li>
                    <li>Сфера деятельности: _____________________</li>
                    <li>Целевая аудитория бота: _____________________</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">1.2. Контактное лицо</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>ФИО: _____________________</li>
                    <li>Должность: _____________________</li>
                    <li>Email: _____________________</li>
                    <li>Telegram: _____________________</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Цели и задачи бота</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">2.1. Основная задача бота</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Автоматизация обслуживания клиентов</p>
                    <p>□ Прием заказов</p>
                    <p>□ Информирование пользователей</p>
                    <p>□ Сбор данных/опросы</p>
                    <p>□ Бронирование/запись</p>
                    <p>□ Обучение/квизы</p>
                    <p>□ Интеграция с другими системами</p>
                    <p>□ Другое: _____________________</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">2.2. Какую проблему решает бот?</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Функционал бота</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">3.1. Основные функции</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Текстовые команды и меню</p>
                    <p>□ Inline-кнопки</p>
                    <p>□ Отправка изображений/файлов</p>
                    <p>□ Прием платежей</p>
                    <p>□ Работа с базой данных</p>
                    <p>□ Уведомления и рассылки</p>
                    <p>□ Админ-панель</p>
                    <p>□ Интеграция с API</p>
                    <p>□ AI-помощник (ChatGPT и др.)</p>
                    <p>□ Другое: _____________________</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">3.2. Опишите сценарий работы бота</h3>
                  <p className="text-muted-foreground ml-4 mb-2">
                    Как должен взаимодействовать пользователь с ботом? Опишите основные шаги:
                  </p>
                  <ul className="list-decimal list-inside text-muted-foreground space-y-2 ml-8">
                    <li>Пользователь запускает бота (/start)</li>
                    <li>_____________________</li>
                    <li>_____________________</li>
                    <li>_____________________</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Интеграции</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">4.1. Нужны ли интеграции?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ CRM-система (какая?): _____________________</p>
                    <p>□ Платежная система (какая?): _____________________</p>
                    <p>□ Email-рассылки</p>
                    <p>□ Календарь/Расписание</p>
                    <p>□ Google Sheets</p>
                    <p>□ AI-сервисы (ChatGPT, Claude и др.)</p>
                    <p>□ Другие API: _____________________</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. База данных и хранение</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.1. Какие данные нужно хранить?</h3>
                  <p className="text-muted-foreground ml-4 mb-2">Например: данные пользователей, история заказов, статистика и т.д.</p>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.2. Нужна ли админ-панель?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Да, для управления контентом</p>
                    <p>□ Да, для просмотра статистики</p>
                    <p>□ Да, для управления пользователями</p>
                    <p>□ Нет</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Дизайн и контент</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">6.1. Тексты для бота</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Заказчик предоставит готовые тексты</p>
                    <p>□ Нужна помощь с составлением текстов</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">6.2. Медиа-контент</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Есть готовые изображения/файлы</p>
                    <p>□ Нужна помощь с созданием контента</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Количество пользователей</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">7.1. Ожидаемое количество пользователей</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ До 100 пользователей</p>
                    <p>□ 100-1000 пользователей</p>
                    <p>□ 1000-10000 пользователей</p>
                    <p>□ Более 10000 пользователей</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">7.2. Нужна ли рассылка?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Да, регулярная рассылка</p>
                    <p>□ Да, по событиям</p>
                    <p>□ Нет</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Примеры и референсы</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">8.1. Примеры ботов, которые нравятся</h3>
                  <p className="text-muted-foreground ml-4 mb-2">Укажите @username ботов или ссылки:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-8">
                    <li>_____________________</li>
                    <li>_____________________</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">8.2. Что нравится в этих ботах?</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Техническая поддержка</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">9.1. Нужна ли поддержка после запуска?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Да, нужна техническая поддержка</p>
                    <p>□ Да, нужны доработки и развитие</p>
                    <p>□ Нет</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Сроки и бюджет</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">10.1. Желаемые сроки запуска</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">10.2. Планируемый бюджет</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Дополнительная информация</h2>
              <p className="text-muted-foreground ml-4">
                Добавьте любую информацию, которая может быть полезна для разработки бота:
              </p>
              <p className="text-muted-foreground ml-4 mt-2">_____________________</p>
            </section>

            <div className="pt-6 border-t text-sm text-muted-foreground">
              <p className="italic">Спасибо за уделенное время! На основе этой информации мы подготовим для вас предложение и приступим к разработке вашего Telegram-бота.</p>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BriefTelegram;
