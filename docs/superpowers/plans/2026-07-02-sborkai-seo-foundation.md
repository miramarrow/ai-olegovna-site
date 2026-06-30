# Sborkai SEO Foundation Work Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to execute this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prepare `https://sborkai.ru` for stable indexing in the Russian search segment after the Vercel migration.

**Architecture:** Keep the current React/Vite SPA on Vercel. Add SEO discovery files and metadata in the existing static/frontend layer, keep lead delivery through the existing Vercel Function, and use webmaster tools for indexing submission.

**Tech Stack:** React 18, TypeScript, Vite, React Router, Vercel, Telegram lead function, GitHub main branch.

---

## Current State

- Production site: `https://sborkai.ru`.
- Hosting: Vercel project `ai-olegovna-site`.
- Domain/DNS: Beget manages DNS only; site traffic is routed to Vercel.
- Lead delivery: `/api/telegram-brief` on Vercel sends заявки to Telegram.
- GitHub auto-connect: Vercel is connected to `miramarrow/ai-olegovna-site`.
- Known SEO gaps: no `sitemap.xml`, no `Sitemap:` entry in `robots.txt`, one shared SPA metadata set, no Schema.org JSON-LD, webmaster tools still need setup/submission.

## Morning Checklist

- [ ] Pull the latest `main` on the MacBook.

```bash
git checkout main
git pull origin main
```

- [ ] Confirm the working tree is clean before edits.

```bash
git status -sb
```

- [ ] Check production availability.

```bash
curl -I https://sborkai.ru/
curl -I https://www.sborkai.ru/
curl -I https://sborkai.ru/api/telegram-brief
```

Expected:
- `/` returns `200`.
- `www` returns `200` or a valid Vercel response.
- `/api/telegram-brief` returns `400` for GET, which is normal because the API expects POST.

## Task 1: Add Sitemap And Robots Entry

- [ ] Create `public/sitemap.xml`.

Include these canonical URLs:
- `https://sborkai.ru/`
- `https://sborkai.ru/about`
- `https://sborkai.ru/services`
- `https://sborkai.ru/services/neuro-office`
- `https://sborkai.ru/services/ai-agents`
- `https://sborkai.ru/services/content-factory`
- `https://sborkai.ru/services/automation`
- `https://sborkai.ru/services/website-development`
- `https://sborkai.ru/services/telegram-max-bots`
- `https://sborkai.ru/services/max-automation`
- `https://sborkai.ru/services/support`
- `https://sborkai.ru/cases`
- `https://sborkai.ru/pricing`
- `https://sborkai.ru/faq`
- `https://sborkai.ru/contacts`
- `https://sborkai.ru/privacy`
- `https://sborkai.ru/terms`

- [ ] Update `public/robots.txt` so it contains a sitemap pointer.

```txt
User-agent: *
Allow: /

Sitemap: https://sborkai.ru/sitemap.xml
```

- [ ] Verify locally that both files are included in the build output.

```bash
npm run build
test -f dist/sitemap.xml
test -f dist/robots.txt
```

## Task 2: Add Route Metadata

- [ ] Add a small route metadata layer for the SPA.

Recommended shape:
- Create `src/config/seo.ts` with route titles, descriptions, canonical URLs, and social metadata.
- Create `src/components/Seo.tsx` or `src/hooks/useSeo.ts` that updates `document.title`, description, canonical, Open Graph, and Twitter tags on route changes.
- Use existing `siteConfig.url` as the canonical origin.
- Use service data from `src/pages/services/servicesData.ts` for service page metadata.

- [ ] Apply metadata on:
- home
- about
- services
- each service detail page
- cases
- pricing
- faq
- contacts
- privacy
- terms

- [ ] Keep title format consistent.

Examples:
- `Sborkai — AI-системы для бизнеса`
- `Нейроофисы — Sborkai`
- `AI-агенты — Sborkai`
- `Контакты — Sborkai`

## Task 3: Add Schema.org JSON-LD

- [ ] Add JSON-LD for the organization/site without inventing physical address or legal data.

Recommended entities:
- `Organization`
- `WebSite`
- `ProfessionalService`

Use only verified public details:
- name: `Sborkai`
- url: `https://sborkai.ru`
- logo: `https://sborkai.ru/logo-sborkai.png` or current public logo
- Telegram: `https://t.me/sborkairu`
- Instagram: current public profile from `siteConfig`
- service area: Russia / Russian-speaking clients if phrased carefully

- [ ] Add FAQ schema only if it mirrors visible FAQ text exactly.

## Task 4: Clean Old Hero/Media Artifacts

- [ ] Search for old hero video/cube references.

```bash
rg -n "HeroCodeVideo|hero-code-generation|project-discuss-cube|cube|video:hero|remotion" src public scripts package.json
```

- [ ] Remove unused imports/components/assets only if they are no longer referenced.
- [ ] Keep `HeroAbstractVisual` as the hero visual.
- [ ] Do not bring back the old cube image.

## Task 5: Webmaster Setup

- [ ] Open Яндекс.Вебмастер and add `https://sborkai.ru`.
- [ ] Open Google Search Console and add `https://sborkai.ru`.
- [ ] If verification requires a file, place it in `public/`.
- [ ] If verification requires a meta tag, add it to `index.html` or the SEO layer.
- [ ] Deploy after adding verification.
- [ ] Submit `https://sborkai.ru/sitemap.xml` in both webmaster tools.

Do not put private tokens or account secrets into the repository.

## Task 6: Optional Analytics

- [ ] If a Yandex Metrica counter is created, add the counter ID through a public-safe config value.
- [ ] Do not commit any private API token.
- [ ] Verify analytics script does not block rendering or form submission.

## Task 7: Verification And Deploy

- [ ] Run local checks.

```bash
npm run check:site-scope
npm run check:lead-delivery
npm run check:smart-brief
npm run lint
npm run build
```

- [ ] Start local preview if visual verification is needed.

```bash
npm run dev
```

- [ ] Check the key pages on desktop and mobile widths:
- `/`
- `/services`
- `/services/ai-agents`
- `/contacts`
- `/faq`

- [ ] Commit and push to `main`.

```bash
git status -sb
git add public/sitemap.xml public/robots.txt src index.html package.json
git commit -m "feat: add sborkai seo foundation"
git push origin HEAD:main
```

- [ ] After Vercel finishes deployment, verify production.

```bash
curl -I https://sborkai.ru/
curl -I https://sborkai.ru/sitemap.xml
curl -I https://sborkai.ru/robots.txt
```

## Acceptance Criteria

- `https://sborkai.ru/sitemap.xml` returns `200`.
- `https://sborkai.ru/robots.txt` contains `Sitemap: https://sborkai.ru/sitemap.xml`.
- Main routes have page-specific titles and descriptions.
- Schema.org JSON-LD is present and contains only accurate public business data.
- Telegram заявки still arrive after deploy.
- Яндекс.Вебмастер and Google Search Console have the sitemap submitted.
- No old cube/video hero appears on the public site.

## Notes For Tomorrow

- SEO indexing is not instant. The goal for tomorrow is to make the site technically ready and submitted, not to guarantee positions in search results the same day.
- Vercel hosting is fine for Russian search indexing as long as the site is accessible, fast, HTTPS-enabled, and submitted through webmaster tools.
- If something asks for a secret, do not paste it into chat or commit it. Use the service UI or environment variables.
