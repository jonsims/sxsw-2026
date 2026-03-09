# SXSW 2026 Trip Guide PWA

## Project Overview
Interactive PWA trip guide for SXSW 2026. Single-page app with hash-based routing.

## Deployment
- **GitHub**: `jonsims/sxsw-2026`
- **Production**: Cloudflare Pages at `sxsw-2026.pages.dev`
- **Local dev**: `https://local.sxsw` (Caddy, no build step)
- **Beta app**: `https://local.sxsw/beta/`

## Architecture
- Vanilla JS/CSS/HTML — no frameworks, no build tools
- Hash-based SPA routing (#now, #schedule, #ref)
- Service worker with stale-while-revalidate caching
- **Must bump SW cache version** on every asset change (currently `sxsw-v13`)

## Main App Structure (`/`)
| File | Purpose |
|------|---------|
| `index.html` | App shell with views and tab bar |
| `app.js` | All logic: DAYS array, REFERENCE data, routing, weather API |
| `style.css` | All styling, CSS variables for light/dark mode |
| `sw.js` | Service worker — update CACHE version + ASSETS list on changes |
| `manifest.json` | PWA manifest |
| `marquee.png` | Header logo (wide neon "SIMS@SX26" sign) |
| `apple-touch-icon.png` | 180px iOS icon (Logo2x2 neon grid) |
| `icon-192.png`, `icon-512.png` | PWA icons (Logo2x2 neon grid) |

## Beta App (`/beta/`)
Schedule-change evaluation tool with 4 tabs: Now, Schedule, Map, Reference.
- Adds event swap/alternative comparison features
- Interactive Leaflet map with venue markers and walking routes
- Own service worker (`sxsw-beta-v2`), shares icons with parent (`../`)

## Key Conventions
- Always-dark header (#1a1a2e) regardless of light/dark mode
- Sticky day tabs require precise `top` offset matching header height
- `env(safe-area-inset-top)` for iPhone notch/Dynamic Island
- Dark mode toggle persists via localStorage
- Weather data from Open-Meteo API with 1-hour cache
