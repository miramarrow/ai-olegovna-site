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
npm run check:vps-runtime
npm run check:site-scope
npm run check:abstract-visuals
npm run lint
npm run build
```

## Заявки: Telegram + Google Sheets

Форма отправляет заявки в `POST /api/telegram-brief` на том же домене. Endpoint работает в Node runtime на Beget VPS: он хранит секреты на сервере, отправляет сообщение в Telegram и, если настроен Google Sheets, добавляет строку через Apps Script Web App.

Переменные окружения для production-сервиса:

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
4. В Project Settings → Script Properties добавьте `SHEETS_WEBHOOK_SECRET` с тем же значением, что в окружении VPS.
5. Deploy → New deployment → Web app: execute as owner, access for anyone with the link.
6. Скопируйте Web app URL в `SHEETS_WEBHOOK_URL`.

Таблица заполняется колонками: `created_at`, `lead_id`, `form_type`, `name`, `preferred_contact`, `phone`, `telegram`, `service`, `start_format`, `comment`, `answers_json`, `page_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`.

## Хостинг и домен

Production для `sborkai.ru` работает на Beget VPS `109.172.36.182`. Приложение собирается командой `npm run build:production`: Vite кладет фронтенд в `dist`, а `esbuild` собирает `server/production-server.ts` в `dist/server.mjs`. Сервер запускается командой `npm start`, отдает SPA-статику и проксирует заявки через тот же `POST /api/telegram-brief`.

DNS в Beget для `sborkai.ru`:

```txt
@    A      109.172.36.182
www  A      109.172.36.182
```

Production-схема на VPS:

1. Nginx принимает HTTP/HTTPS на `sborkai.ru` и `www.sborkai.ru`.
2. Nginx проксирует запросы в Node-сервис на `127.0.0.1:3000`.
3. Node-сервис запускает `dist/server.mjs` под systemd.
4. Шаблоны конфигурации лежат в `deploy/nginx/sborkai.conf`, `deploy/systemd/sborkai.service` и `deploy/sborkai.env.example`.
5. Секреты лежат только в окружении VPS, не в клиентском коде и не в git.

## Hero-визуал

Главный экран использует рисованный компонент `HeroAbstractVisual` из `src/components/HeroAbstractVisual.tsx`.

## Архитектурные заметки

- Бренд, публичные контакты и основные ссылки лежат в `src/config/site.ts`.
- Блог, кейсы и отзывы удалены из v1: нет маршрутов, меню, главных секций и исходных файлов этих зон.
- Заявки идут через Node-сервис на Beget VPS в Telegram; Google Sheets можно подключить дополнительно. Секреты должны храниться только в окружении VPS и Apps Script.
