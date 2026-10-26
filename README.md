# Agencia A1 — sitio web

Vite + React 19 + TypeScript + Tailwind v4. React Bits: LineSidebar, FlexCarousel (ogl/WebGL), StrokeText (GSAP).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/ (static, deployable anywhere)
```

## Content

| What | Where |
|---|---|
| Projects (text, services, results) | `src/data/projects.ts` |
| Project images + client logos | `node scripts/build-assets.mjs` → `public/projects`, `public/logos`, `src/data/assets.json` |
| Stats (`null` = pending, shows "00") | `src/data/site.ts` → `STATS` |
| Team (add `photo: '/team/name.webp'`) | `src/data/site.ts` → `TEAM` |
| Contact email | `src/data/site.ts` → `CONTACT_EMAIL` |

To add or swap a project, add its folder to `PROJECTS` in `scripts/build-assets.mjs`, run the script, and add an entry in `projects.ts` (max 12 are shown).

## Contact form

Set `VITE_CONTACT_ENDPOINT` in `.env` (Formspree, Getform, or your own function). The form sends JSON with `name, email, subject, company, phone, message`. If the variable isn't set, the form simulates a successful send.

## Analytics

`src/lib/track.ts` pushes `project_open` and `contact_submit` to `window.dataLayer`. Paste the GTM snippet into `index.html`.

## Notes

- `src/components/reactbits/LineSidebar.tsx` is patched with a controlled `activeIndex` prop (scroll-spy) and keyboard support.
- `scripts/shots.mjs` is a dev helper that takes a screenshot of every section with local Chrome.
