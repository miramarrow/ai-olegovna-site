# Sborkai Repositioning Design

## Goal

Reposition the site as the light, AI-product brand "Sborkai" focused on neuro-offices, AI agents, content factories, automations, websites, and bots/automations for Telegram and MAX.

## Scope

- Replace the main offer with "Нейроофисы, AI-агенты, контент-заводы и боты под ключ".
- Use a light visual system: white background, blue accent, light cards, less rounded buttons, and no dark hero treatment.
- Update navigation to "О проекте", "Услуги", "Оценка", "FAQ", "Контакты"; logo links to home.
- Replace rigid pricing with project assessment and startup formats.
- Remove old brand/contact traces: no mail contact, no address, Telegram is `@miramarrow`, phone and WhatsApp stay `+7 (993) 257-77-40`.
- Remove installment, T-Bank/Tinkoff, promo landing offer, hard prices, and console-based submission.
- Rebuild service directions as: neuro-offices, AI agents, content factories, automations, websites, Telegram and MAX bots, MAX automations, support.
- Keep `/pricing`, but rewrite it as "Оценка проекта".
- Add or update service pages for `/services/neuro-office`, `/services/ai-agents`, `/services/content-factory`, `/services/telegram-max-bots`, and `/services/max-automation`.
- Update documents and brief pages to cover the new service set and Telegram/MAX wording.

## Architecture

Service content should come from a single data source used by the home carousel, services grid, service detail pages, and footer links. Brief questions should live in `briefTemplates`, separate from the form UI, with a small message builder that creates one final text for WhatsApp/Telegram delivery.

The form stays frontend-only. WhatsApp opens with a prefilled message. Telegram copies the complete message to the clipboard and opens `@miramarrow`, because Telegram links do not reliably support long prefilled messages.

## Data Flow

1. User fills contact fields.
2. User selects a service direction.
3. The form renders 5-7 questions from `briefTemplates[selectedService]`.
4. On submit, the app builds one message with contacts, service, start format, brief answers, and comment.
5. WhatsApp opens with encoded text, or Telegram opens after clipboard copy.
6. Toasts show clear status; no `console.log` submission remains.

## Testing

- Add a script-level smart brief check before implementation and watch it fail first.
- Run the smart brief check after implementation.
- Run `npm run check:site-scope`.
- Run `npm run lint`.
- Run `npm run build`.
- Search for retired financing, promo, old brand, old console submission, old fixed-price wording, and old Telegram-only brief wording.
