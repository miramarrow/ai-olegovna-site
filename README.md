# Sborkai

Информационный сайт об AI-системах, сайтах, ботах и автоматизациях. Собран на Vite, React, TypeScript и Tailwind CSS.

Сайт работает без форм, публичных контактов, личных кабинетов, веб-аналитики и необязательных cookie. Сервер не принимает заявки и не передаёт данные в Telegram, CRM или таблицы.

## Локальный запуск

```sh
npm install
npm run dev
```

## Проверки

```sh
npm run check:informational-site
npm run check:vps-runtime
npm run check:site-scope
npm run check:abstract-visuals
npm run lint
npm run build
```

## Хостинг и домен

Production для `sborkai.ru` работает на Beget VPS `109.172.36.182`. Команда `npm run build:production` собирает клиент и минимальный Node-сервер из `server/production-server.ts`, который отдаёт SPA-статику и отвечает на `GET /healthz`.

Обновление сайта на VPS:

```sh
npm run deploy:vps
```

Команда собирает production-версию, синхронизирует `dist` на сервер, перезапускает `sborkai.service` и проверяет `https://sborkai.ru/healthz`.

Production-схема:

1. Nginx принимает HTTP/HTTPS на `sborkai.ru` и `www.sborkai.ru`.
2. Nginx проксирует запросы в Node-сервис на `127.0.0.1:3000`.
3. Node-сервис запускает `dist/server.mjs` под systemd.
4. Шаблоны находятся в `deploy/nginx/sborkai.conf`, `deploy/systemd/sborkai.service` и `deploy/sborkai.env.example`.

## Архитектурные заметки

- Бренд и реквизиты владельца сайта находятся в `src/config/site.ts`.
- Страница `/privacy` объясняет информационный режим и возможные технические журналы сервера.
- Страница `/terms` фиксирует условия использования информационных материалов.
- Старые архивы заявок на VPS не удаляются автоматически при деплое.
