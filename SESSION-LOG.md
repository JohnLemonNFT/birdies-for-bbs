# Session Log — birdies-for-bbs

<!--
INSTRUCTIONS FOR CLAUDE CODE:
Append a new entry at the top (below this header) after completing significant work.
Keep entries concise. This file is read by Cowork for cross-project status updates.
-->

## 2026-03-08 — Full Build + Deploy + CRM

**Focus:** Complete site build from prototype to production, AI image generation, Vercel deploy, CRM business scraping.

**Key Decisions:**
- React + Vite + Tailwind CSS v4 (utility-first with `@theme` tokens)
- Dark luxury aesthetic: gold (#C5A55A) / charcoal (#141414) / emerald (#1B6B3A)
- Cormorant Garamond (headings) + Outfit (body) via Google Fonts `<link>` tags
- Imagen 4 Ultra for AI-generated golf photography
- Deployed to Vercel at https://birdies-for-bbs.vercel.app

**Completed:**
- Full site: Nav (mobile hamburger), Hero (countdown timer), Story, About BBS, Event Details (Google Maps, 5-item schedule), Sponsors (5 tiers including Cart $300), Ways to Help, Contact Form (Formspree), Footer (BBS Foundation badge)
- SEO: OG tags, Twitter card, JSON-LD Event schema, SVG diamond favicon
- 4 AI images: hero-bg.jpg, og-image.jpg, course-landscape.jpg, golf-ball-tee.jpg
- CRM CSV: 89 new businesses (total 124 with existing 35), zero duplicates
- Vercel production deploy

**Open Items:**
- Josh needs to add Formspree form ID to ContactForm.jsx
- Domain setup: when birdiesforbbs.com is registered, add to Vercel
- Sponsor logos: add to `src/data/sponsors.js` as sponsors confirm
- Google Maps embed URL may need updating with exact place ID

**Files Changed:**
All files in `src/`, `public/`, `index.html`, `birdies-new-businesses.csv`

