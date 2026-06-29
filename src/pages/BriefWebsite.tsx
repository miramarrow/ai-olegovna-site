import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeRain from "@/components/CodeRain";
import { Card } from "@/components/ui/card";

const BriefWebsite = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CodeRain />
      <Header />
      
      <main className="flex-grow relative z-10 pt-20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
            Бриф на разработку сайта
          </h1>
          
          <Card className="p-8 space-y-8">
            <section>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Заполнение брифа поможет нам лучше понять ваши задачи и создать сайт, который будет работать на результат.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Общая информация</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">1.1. Информация о компании</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Название компании: _____________________</li>
                    <li>Сфера деятельности: _____________________</li>
                    <li>Целевая аудитория: _____________________</li>
                    <li>География работы: _____________________</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">1.2. Контактное лицо</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>ФИО: _____________________</li>
                    <li>Должность: _____________________</li>
                    <li>Email: _____________________</li>
                    <li>Телефон: _____________________</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Цели и задачи проекта</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">2.1. Основные цели сайта</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Привлечение новых клиентов</p>
                    <p>□ Повышение узнаваемости бренда</p>
                    <p>□ Продажи товаров/услуг онлайн</p>
                    <p>□ Информирование аудитории</p>
                    <p>□ Сбор заявок</p>
                    <p>□ Другое: _____________________</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">2.2. Что должен делать посетитель на сайте?</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Тип и структура сайта</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">3.1. Тип сайта</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Лендинг (одностраничный)</p>
                    <p>□ Корпоративный сайт</p>
                    <p>□ Интернет-магазин</p>
                    <p>□ Каталог</p>
                    <p>□ Раздел статей/новостей</p>
                    <p>□ Веб-сервис</p>
                    <p>□ Другое: _____________________</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">3.2. Структура сайта (основные разделы)</h3>
                  <p className="text-muted-foreground ml-4 mb-2">Перечислите основные страницы:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-8">
                    <li>_____________________</li>
                    <li>_____________________</li>
                    <li>_____________________</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Функциональные требования</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">4.1. Необходимый функционал</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Форма обратной связи</p>
                    <p>□ Онлайн-чат</p>
                    <p>□ Личный кабинет пользователя</p>
                    <p>□ Корзина и оформление заказа</p>
                    <p>□ Интеграция с CRM</p>
                    <p>□ Многоязычность</p>
                    <p>□ Раздел новостей</p>
                    <p>□ Калькулятор стоимости</p>
                    <p>□ Поиск по сайту</p>
                    <p>□ Интеграция с соцсетями</p>
                    <p>□ Другое: _____________________</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Дизайн</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.1. Есть ли фирменный стиль/брендбук?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Да (предоставим)</p>
                    <p>□ Нет (нужна разработка)</p>
                    <p>□ Частично</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.2. Предпочтения по дизайну</h3>
                  <p className="text-muted-foreground ml-4 mb-2">Опишите желаемый стиль или укажите примеры сайтов, которые нравятся:</p>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">5.3. Цветовые предпочтения</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Контент</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">6.1. Кто будет готовить контент?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Заказчик предоставит готовые тексты</p>
                    <p>□ Нужна помощь с написанием текстов</p>
                    <p>□ Нужен копирайтинг</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">6.2. Фото и видео материалы</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Есть готовые материалы</p>
                    <p>□ Нужна фотосъемка</p>
                    <p>□ Будем использовать стоковые фото</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Технические требования</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">7.1. Есть ли домен?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Да: _____________________</p>
                    <p>□ Нет (нужна помощь с регистрацией)</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">7.2. Есть ли хостинг?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Да</p>
                    <p>□ Нет (нужна помощь с выбором)</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">7.3. Нужна ли административная панель?</h3>
                  <div className="text-muted-foreground space-y-2 ml-4">
                    <p>□ Да, для управления контентом</p>
                    <p>□ Нет</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Конкуренты и примеры</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">8.1. Сайты конкурентов</h3>
                  <p className="text-muted-foreground ml-4 mb-2">Укажите 2-3 сайта конкурентов:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-8">
                    <li>_____________________</li>
                    <li>_____________________</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">8.2. Что нравится/не нравится на их сайтах?</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Сроки и бюджет</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">9.1. Желаемые сроки запуска</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">9.2. Планируемый бюджет</h3>
                  <p className="text-muted-foreground ml-4">_____________________</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Дополнительная информация</h2>
              <p className="text-muted-foreground ml-4">
                Добавьте любую информацию, которая может быть полезна для разработки сайта:
              </p>
              <p className="text-muted-foreground ml-4 mt-2">_____________________</p>
            </section>

            <div className="pt-6 border-t text-sm text-muted-foreground">
              <p className="italic">Спасибо за уделенное время! На основе этой информации мы подготовим для вас предложение и приступим к разработке вашего сайта.</p>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BriefWebsite;
