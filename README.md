# Sborkai

AI-продуктовый сайт на базе Vite, React, TypeScript, Tailwind CSS и shadcn/ui.

## Локальный запуск

```sh
npm install
npm run dev
```

## Проверки

```sh
npm run check:lead-delivery
npm run check:site-scope
npm run check:abstract-visuals
npm run check:remotion-timeline
npm run lint
npm run build
```

## Заявки: Telegram + Google Sheets

Форма отправляет заявки в `POST /api/telegram-brief`. Endpoint рассчитан на Vercel Functions: он хранит секреты на сервере, отправляет сообщение в Telegram и, если настроен Google Sheets, добавляет строку через Apps Script Web App.

Переменные окружения для Vercel:

```sh
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SHEETS_WEBHOOK_URL=
SHEETS_WEBHOOK_SECRET=
```

`TELEGRAM_BOT_TOKEN` — серверный токен бота для заявок. Не добавляйте его в `VITE_*`, исходники или клиентский бандл.

`TELEGRAM_CHAT_ID` — чат, группа или канал, куда бот отправляет заявки. Если заявки должны попадать в канал, добавьте бота администратором канала и укажите ID или публичный `@username` канала.

Для текущего бота заявок private chat id: `7704294867`.

`SHEETS_WEBHOOK_URL` и `SHEETS_WEBHOOK_SECRET` опциональны. Без них заявка всё равно уйдёт в Telegram, но не будет записана в таблицу.

Google Sheets, если нужен архив заявок:

1. Создайте таблицу для заявок.
2. Откройте Extensions → Apps Script.
3. Вставьте код из `scripts/google-sheets-leads-webhook.gs`.
4. В Project Settings → Script Properties добавьте `SHEETS_WEBHOOK_SECRET` с тем же значением, что в Vercel.
5. Deploy → New deployment → Web app: execute as owner, access for anyone with the link.
6. Скопируйте Web app URL в `SHEETS_WEBHOOK_URL`.

Таблица заполняется колонками: `created_at`, `lead_id`, `form_type`, `name`, `preferred_contact`, `phone`, `telegram`, `service`, `start_format`, `comment`, `answers_json`, `page_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`.

## Хостинг и домен

Целевая схема для `sborkai.ru`: основной frontend отдает российский VPS через Nginx, а заявки обрабатывает Vercel Function. Для браузера endpoint остается тем же: `POST /api/telegram-brief`.

Vercel нужен только для backend-части заявок:

1. Импортируйте этот GitHub-репозиторий в Vercel.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Добавьте Environment Variables: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `SHEETS_WEBHOOK_URL`, `SHEETS_WEBHOOK_SECRET`.
5. Не подключайте `sborkai.ru` как custom domain в Vercel для основной публикации. Сохраните Vercel deployment host вида `sborkai-vercel-project.vercel.app`: он понадобится Nginx-прокси.

Для `sborkai.ru`:

1. Купите или подключите домен у аккредитованного `.ru` регистратора.
2. Создайте российский VPS и скопируйте туда результат `npm run build` из `dist`.
3. У регистратора настройте DNS: `sborkai.ru` → A-запись на IP VPS, `www.sborkai.ru` → A-запись на тот же IP VPS.
4. На VPS используйте Nginx как статический сервер и reverse proxy. Шаблон лежит в `docs/deployment/sborkai-nginx.conf`; замените `sborkai-vercel-project.vercel.app` на реальный Vercel deployment host.
5. В Nginx SPA-маршруты должны падать назад в `index.html`, а заявки должны проксироваться на Vercel:

```nginx
location = /api/telegram-brief {
  proxy_pass https://sborkai-vercel-project.vercel.app/api/telegram-brief;
  proxy_ssl_server_name on;
}
```

6. После того как DNS указывает на VPS, выпустите SSL для обоих имен, например через Certbot: `sborkai.ru` и `www.sborkai.ru`.
7. `www.sborkai.ru` должен редиректить на `https://sborkai.ru`.
8. GitHub Pages можно оставить техническим fallback на домене репозитория. `public/CNAME` специально отсутствует, потому что custom domain больше не закрепляется за Pages.

## Hero-видео

Главный экран использует `public/media/hero-code-generation.mp4`. Исходная Remotion-композиция лежит в `src/remotion`.

```sh
npm run video:hero
```

Если видео не загрузится у пользователя, компонент `HeroCodeVideo` покажет прежний `HeroAbstractVisual`.

## Архитектурные заметки

- Бренд, публичные контакты и основные ссылки лежат в `src/config/site.ts`.
- Блог, кейсы и отзывы удалены из v1: нет маршрутов, меню, главных секций и исходных файлов этих зон.
- Заявки идут через Vercel Function в Telegram; Google Sheets можно подключить дополнительно. Секреты должны храниться только в окружении Vercel и Apps Script.
