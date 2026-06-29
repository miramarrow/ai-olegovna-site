import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

const PricingSection = () => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  const services = [
    {
      category: "Разработка сайтов",
      items: [
        {
          name: "Лендинг (одностраничный сайт)",
          price: "30 000",
          includes: ["Адаптивный дизайн", "Форма обратной связи", "SEO-оптимизация", "Хостинг на 1 месяц"]
        },
        {
          name: "Корпоративный сайт",
          price: "80 000",
          includes: ["До 10 страниц", "Адаптивный дизайн", "CMS система", "SEO-оптимизация", "Форма обратной связи"]
        },
        {
          name: "Интернет-магазин",
          price: "150 000",
          includes: ["Каталог товаров", "Корзина и оплата", "Личный кабинет", "Интеграция с CRM", "Адаптивный дизайн"]
        },
        {
          name: "Веб-приложение",
          price: "250 000",
          includes: ["Кастомная разработка", "API интеграции", "Админ-панель", "Базы данных", "Масштабируемая архитектура"]
        },
        {
          name: "Портал/Маркетплейс",
          price: "500 000",
          includes: ["Сложная архитектура", "Личные кабинеты", "Платежная система", "Админ-панель", "Интеграции"]
        }
      ]
    },
    {
      category: "Telegram решения",
      items: [
        {
          name: "Telegram-бот (простой)",
          price: "25 000",
          includes: ["Базовый функционал", "До 5 команд", "Меню навигации", "Техподдержка 1 месяц"]
        },
        {
          name: "Telegram-бот (продвинутый)",
          price: "60 000",
          includes: ["Расширенный функционал", "Интеграция с базой данных", "Оплата и подписки", "Админ-панель"]
        },
        {
          name: "Telegram Mini App",
          price: "100 000",
          includes: ["Веб-интерфейс в Telegram", "Интерактивность", "База данных", "API интеграции", "Дизайн UI/UX"]
        }
      ]
    },
    {
      category: "Автоматизация",
      items: [
        {
          name: "N8N автоматизация (простая)",
          price: "20 000",
          includes: ["До 3 интеграций", "Базовый сценарий", "Настройка и запуск", "Инструкция"]
        },
        {
          name: "N8N автоматизация (комплексная)",
          price: "70 000",
          includes: ["Множество интеграций", "Сложная логика", "Обработка данных", "Документация", "Обучение"]
        },
        {
          name: "Кастомная автоматизация",
          price: "150 000",
          includes: ["Индивидуальная разработка", "Любые интеграции", "Масштабирование", "Поддержка 3 месяца"]
        }
      ]
    },
    {
      category: "AI решения",
      items: [
        {
          name: "AI контент-генерация",
          price: "40 000",
          includes: ["Генерация текстов", "Интеграция OpenAI/Claude", "Веб-интерфейс", "API доступ"]
        },
        {
          name: "AI видео-обработка",
          price: "80 000",
          includes: ["Обработка видео с AI", "Генерация субтитров", "Анализ контента", "Автоматизация"]
        },
        {
          name: "AI чат-бот для сайта",
          price: "60 000",
          includes: ["Интеграция на сайт", "Обучение на ваших данных", "Умные ответы", "Аналитика"]
        }
      ]
    },
    {
      category: "Дополнительные услуги",
      items: [
        {
          name: "Техническая поддержка",
          price: "15 000",
          includes: ["Консультации", "Исправление ошибок", "Обновления", "Приоритет в очереди"]
        },
        {
          name: "Веб-сервисы и API",
          price: "50 000",
          includes: ["Разработка REST API", "Документация", "Тестирование", "Развертывание"]
        },
        {
          name: "Интеграции с сервисами",
          price: "20 000",
          includes: ["Подключение к внешним API", "Настройка обмена данных", "Тестирование", "Документация"]
        }
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Стоимость услуг
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto px-4">
            Точная стоимость каждого проекта рассчитывается индивидуально. Указанные цены средние
          </p>
        </div>

        <div className="space-y-6">
          {services.map((serviceCategory) => {
            const isExpanded = expandedCategories[serviceCategory.category];
            
            return (
              <Card key={serviceCategory.category} className="overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(serviceCategory.category)}
                  className="w-full bg-primary/10 px-6 py-4 flex items-center justify-between hover:bg-primary/15 transition-colors"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-left">{serviceCategory.category}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      {isExpanded ? 'Свернуть' : 'Развернуть'}
                    </span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>
                
                {/* Category Content */}
                {isExpanded && (
                  <div className="animate-in slide-in-from-top-2">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/30">
                            <th className="text-left p-4 font-semibold">Услуга</th>
                            <th className="text-left p-4 font-semibold min-w-[120px]">Стоимость</th>
                            <th className="text-left p-4 font-semibold">Что входит</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serviceCategory.items.map((item, index) => (
                            <tr 
                              key={item.name} 
                              className={`border-b last:border-b-0 hover:bg-muted/20 transition-colors ${
                                index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                              }`}
                            >
                              <td className="p-4 font-medium">{item.name}</td>
                              <td className="p-4">
                                <div className="flex flex-col">
                                  <span className="text-sm text-muted-foreground">от</span>
                                  <span className="text-xl font-bold text-primary whitespace-nowrap">{item.price} ₽</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <ul className="space-y-2">
                                  {item.includes.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-sm">
                                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y">
                      {serviceCategory.items.map((item) => (
                        <div key={item.name} className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-semibold text-base flex-1">{item.name}</h4>
                            <div className="flex flex-col items-end shrink-0">
                              <span className="text-xs text-muted-foreground">от</span>
                              <span className="text-lg font-bold text-primary whitespace-nowrap">{item.price} ₽</span>
                            </div>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-xs font-semibold mb-2 text-muted-foreground">Что входит:</p>
                            <ul className="space-y-2">
                              {item.includes.map((feature) => (
                                <li key={feature} className="flex items-start gap-2">
                                  <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground text-lg">
            Нужна точная оценка вашего проекта? Опишите задачу — рассчитаем стоимость за 1 день
          </p>
          <Button size="lg" className="py-6 px-8 hover-scale" asChild>
            <a href="/#contact-form">Получить расчёт стоимости</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
