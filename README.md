# Padel Social Vol. 2 — Play Padel Club

Single-page event landing. Astro (static output), plain CSS with custom properties, and a little TypeScript.

> Status: **design approved, preview deploy.** The registration form is visible but not connected yet: on submit it shows “Registration opens very soon — message us on Telegram” and sends nothing. Next: Stage 4 (Supabase + Formspree).

## Local setup

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output → dist/
npm run preview   # serve the production build
npm run check     # type check
```

Requires Node 22.12+.

## Where things live

| What | Where |
|---|---|
| All copy, event facts, links, FAQ, nav | `src/content/site.ts` |
| Photo slots (filenames, alt text, ratios) | `src/content/photos.ts` |
| Design tokens (colour, type, spacing, motion) | `src/styles/tokens.css` |
| Sections (01–10) | `src/sections/` |
| Nav, footer, photo slot, badge, marquee | `src/components/` |
| Creative brief + references | `docs/brief.md`, `docs/reference/` |
| Photo shot list | `docs/photo-shotlist.md` |

## Replacing placeholder photos

Drop the new file into `src/assets/photos/` and set `file` for that slot in `src/content/photos.ts`. Crops (`position`, `zoom`) are set there too. See `docs/photo-shotlist.md`.

## Editing copy

Edit `src/content/site.ts`. Search for `TODO(` to find unknown content, and `DRAFT` for text that needs review.

## Deploy: GitHub → Vercel

The project is a static Astro site. Vercel detects it automatically.

1. **GitHub.** Create an empty repository (no README), e.g. `padel-social-vol2`. In this folder run:
   ```bash
   git remote add origin https://github.com/<you>/padel-social-vol2.git
   git push -u origin main
   ```
   (Or use GitHub Desktop: File → Add Local Repository → this folder → Publish.)
2. **Vercel.** vercel.com → Add New… → Project → import the GitHub repo.
   - Framework preset: **Astro** (auto-detected)
   - Build command: `npm run build` · Output directory: `dist` · Install: `npm install`
   - Node.js version: 22.x (Project Settings → General)
   - Environment variables: none needed for the preview. Optional: `PUBLIC_SITE_URL` = your final domain (otherwise the Vercel production domain is used for canonical/OG).
3. Click **Deploy**. Every push to `main` redeploys; other branches get preview URLs.
4. **Custom domain (optional).** Project → Settings → Domains → add the domain and set the DNS records Vercel shows. Then set `PUBLIC_SITE_URL` to it and redeploy.

### Later (Stage 4)
Add in Vercel → Settings → Environment Variables: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, optional `PUBLIC_FORMSPREE_ID`. Never add the Supabase service_role key.

