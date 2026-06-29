# Ai, Olegovna Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the site around AI-product services, light visuals, project assessment, and a compact smart brief without backend submission.

**Architecture:** Create focused data files for service catalog and brief templates. Update pages and components to consume shared data, remove old pricing/promo components, and keep final delivery through WhatsApp/Telegram links.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind, shadcn/ui, lucide-react, Node scripts.

---

## File Structure

- Create `src/data/briefTemplates.ts` for service options, brief questions, start formats, and final message builder.
- Create or update `src/pages/services/servicesData.ts` as the single service catalog consumed by service pages and list sections.
- Modify `src/components/ProjectDiscussForm.tsx` to render the smart brief and deliver messages.
- Modify `src/components/Hero.tsx`, `src/components/Header.tsx`, `src/components/ServicesSection.tsx`, `src/components/PricingSection.tsx`, `src/components/Footer.tsx`, and page files for positioning and light copy.
- Modify `src/index.css` and `src/App.css` for the light theme and reduced roundness.
- Modify document pages and public document HTML to remove old pricing/brand and add Telegram/MAX and MAX automation wording.
- Delete retired promo/installment components once imports are removed.
- Create `scripts/check-smart-brief.mjs` and add `npm run check:smart-brief`.

## Tasks

### Task 1: Smart Brief Test

- [ ] Create `scripts/check-smart-brief.mjs` that imports or inspects `src/data/briefTemplates.ts` and verifies all required service templates, 5-7 questions each, start formats, and message-builder behavior.
- [ ] Run `node scripts/check-smart-brief.mjs` and confirm it fails because the data file does not exist yet.

### Task 2: Shared Data

- [ ] Create `src/data/briefTemplates.ts` with service options, question templates, start formats, and `buildBriefMessage`.
- [ ] Replace `src/pages/services/servicesData.ts` with the new service catalog for the eight service directions and the required slugs.
- [ ] Run `node scripts/check-smart-brief.mjs` and confirm it passes.

### Task 3: Form Delivery

- [ ] Rewrite `src/components/ProjectDiscussForm.tsx` as a compact smart brief using `briefTemplates`.
- [ ] Make WhatsApp open with encoded full message.
- [ ] Make Telegram copy the full brief to the clipboard and open `@miramarrow`.
- [ ] Remove console-based submission and use clear toast statuses.

### Task 4: Site Positioning

- [ ] Update `siteConfig`, header, footer, hero, about, FAQ, contacts, services list, and service templates to the new positioning.
- [ ] Replace `/pricing` and `PricingSection` with project assessment content and CTA to the smart brief.
- [ ] Remove installment and promo imports and delete retired promo/installment components.

### Task 5: Visual Update

- [ ] Update global CSS tokens to a white/light theme with blue primary accent.
- [ ] Reduce button/card roundness where site-level classes used oversized pills.
- [ ] Keep CodeRain but make it blue and subtle against the light background.

### Task 6: Documents

- [ ] Update React document pages and public HTML documents for the new service set.
- [ ] Replace Telegram-only brief wording with Telegram/MAX where appropriate.
- [ ] Remove old brand, hard prices, installments, old contacts, and false legal/address data.

### Task 7: Verification

- [ ] Run `npm run check:smart-brief`.
- [ ] Run `npm run check:site-scope`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run the retired-term search and fix every hit relevant to source/doc content.
- [ ] Start the dev server and inspect the main pages/form.

