# LWKY Roster Website

## Overview
Fortnite org website for LWKY. Single-page home with scroll sections + standalone Graveyard page.

## Tech Stack
- React 19 + TypeScript + Vite 7
- Framer Motion for animations
- React Router v7 (Home + /graveyard)
- Vanilla CSS with CSS variables
- Deploy target: Vercel

## Project Structure
```
src/
  components/    # Reusable UI components
  pages/         # Home.tsx, Graveyard.tsx
  data/          # config.ts, players.ts, events.ts, graveyard.ts
  styles/        # app.css (main), graveyard.css
  index.css      # Variables, reset, font-face
  App.tsx        # Router + AudioPlayer
  main.tsx       # Entry point with BrowserRouter
```

## Commands
- `npm run dev` — Start dev server (port 5173)
- `npm run build` — TypeScript check + Vite production build
- `npm run preview` — Preview production build

## Key Patterns
- CSS variables defined in `src/index.css` (--bg-primary, --accent, --border, etc.)
- Framer Motion fadeUp variant: `{ opacity: 0, y: 30 }` → `{ opacity: 1, y: 0 }`, ease `[0.22, 1, 0.36, 1]`
- Card pattern: --bg-card bg, 1px solid var(--border), border-radius: 16px, hover lift
- Section header: .section-label + .section-title + .section-subtitle
- Brand font: Futura Heavy Oblique via --font-brand (user-provided .woff2)

## Data Files
All content is in `src/data/`:
- `config.ts` — Social links, tagline, video/audio paths
- `players.ts` — Roster data (name, role, avatar, socials)
- `events.ts` — Tournament events (date, time, prizepool, status)
- `graveyard.ts` — Highlight clips (opponent, player, video URL)

## User-Provided Assets
These must be added by the user:
- `public/images/logo.png` — Org logo
- `public/fonts/FuturaHeavyOblique.woff2` — Brand font
- `public/images/players/*.png` — Player avatars
- `public/videos/bg*.mp4` — Hero background videos (9:16 portrait)
- `public/videos/graveyard/clip*.mp4` — Graveyard clips
- `public/audio/ambient.mp3` — Background audio (optional)

## Deployment
Vercel with SPA rewrites configured in `vercel.json`.
