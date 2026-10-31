# SHARMISRI — THE SERIES

A cinematic, streaming-inspired portfolio for **Sharmisri N S**: Full-Stack Developer and B.Tech Information Technology student.
Every section is an episode, every project is an Original, and the whole site plays like a series.

> A personal portfolio with a fictional streaming-platform look. It is not affiliated with Netflix or any other streaming service and uses none of their logos.

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

The static site is written to `dist/` and can be deployed as-is to Vercel, Netlify, GitHub Pages or any static host.

## Updating the content

**All content lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).** It was generated from the resume, and every component reads from it.

| To change… | Edit |
| --- | --- |
| Name, intro, email, LinkedIn, GitHub | `profile` |
| A project, or a new one | `projects` (add an object; it appears in Originals, the overlay, the resume sheet and the counts) |
| Achievements / certifications | `achievements`, `certifications` |
| Skills and their "where it's used" notes | `skillCategories`, `skillEvidence` |
| Seasons and episodes (My Journey) | `seasons` |
| Top 10 row | `topPicks` |
| ▶ Play Intro highlight reel | `introSlides` |
| Profile order (Recruiter / Developer / Creative) | `viewerProfiles` |
| Opening studio card text | `profile.originalLabel` |

**Resume:** replace `public/assets/Sharmisri_NS_Resume.pdf`.

**Photo:** replace `pic1.jpeg` (high-res photo) and `pic.png` (background-removed cutout with the same framing), then run:

```bash
npm run images
```

This rebuilds the responsive WebP portraits and the social share image in `public/assets/`.

## What's inside

```
src/
  data/portfolio.ts        ← single source of truth (from the resume)
  App.tsx                  ← stages: opening → profile select → home; overlays
  components/
    OpeningSequence        ← black → studio card → SHARMISRI → THE SERIES → portrait → ▶ PLAY
    ProfileSelector        ← "Who's watching?" (changes section order only)
    Navbar                 ← hide-on-scroll nav, profile switcher, mobile menu
    Hero                   ← billboard: parallax portrait, particles, light streaks, floating chips
    PlayIntro              ← ▶ Play Intro: zoom into portrait → highlight reel (pause, ← →, tap zones)
    ContinueWatching       ← cards with real "watched" progress bars
    About                  ← The Pilot
    Seasons / EpisodeCard  ← My Journey as seasons and episodes
    Originals / ProjectCard← pinned horizontal sequence on desktop, swipe rail on touch
    ProjectModal           ← full-screen project overlay with a shared-element transition
    TopPicks               ← Top 10-style row
    Skills                 ← skill genres; each card shows where the skill appears
    Achievements           ← award-poster cards + certification rail (links to credentials)
    ResumeViewer/ResumeModal ← designed resume sheet, PDF viewer, download
    FinalCTA               ← TO BE CONTINUED… + contact links
    CustomCursor, fx.tsx   ← cursor states, magnetic buttons, 3D tilt, text reveals, particles
  hooks/                   ← Lenis smooth scroll + scroll lock, media queries, watch progress
scripts/build-images.mjs   ← portrait/share-image pipeline (sharp)
```

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion 11, Lenis.

## Accessibility and performance

- `prefers-reduced-motion` is respected: smooth scroll, the custom cursor, tilt, particles, grain and the pinned horizontal scroll turn off, and the opening jumps straight to its final frame.
- Hover effects only run on devices with a precise pointer. Touch devices get tap interactions and native swipe rails.
- The custom cursor appears only with a mouse or trackpad.
- Overlays close with Esc, and the highlight reel supports Space and the ← → keys.
- Portraits are responsive WebP files (25–90 KB). Overlays are code-split, and particles pause when they're off screen.

## Keyboard shortcuts

- **Opening:** Enter or Esc skips it.
- **Play Intro:** Space pauses, ← and → change slides, Esc closes.
- **Project and resume overlays:** Esc closes.

---

## Backend (Express + MongoDB) & configuration

The portfolio frontend is static; the optional API in `server/` stores contact-form submissions in MongoDB.
The browser never talks to MongoDB — only to this API.

### Run locally

```bash
# 1) frontend
npm install
cp .env.example .env.local          # sets VITE_API_URL=http://localhost:5000
npm run dev                         # http://localhost:5173

# 2) backend (second terminal)
cd server
npm install
cp .env.example .env                # then put your real MONGODB_URI in server/.env
npm run dev                         # http://localhost:5000
npm test                            # API tests (no database needed)
```

### Endpoints

| Method | Path           | Purpose                                                          |
| ------ | -------------- | ---------------------------------------------------------------- |
| GET    | `/api/health`  | `{ ok, db }` — whether the API can reach MongoDB                 |
| POST   | `/api/contact` | Validates `{ name, email, message }`, stores it (5 requests / 15 min / IP) |

Frontend client: `src/lib/api.ts` (`submitContact`, `checkHealth`), configured by `VITE_API_URL`.

**Contact form:** the "Let's Build" button on the closing screen opens a contact form (`src/components/ContactModal.tsx`)
with loading, success and error states. It only activates when `VITE_API_URL` is set at build time; without it the button
falls back to a plain `mailto:` link, so the site never has a dead button. `VITE_*` values are baked in when you run
`npm run build`, so set `VITE_API_URL` to your deployed API URL before building for production.

### Manual setup you must do

1. Create a MongoDB Atlas cluster, a database user, and allow your IP (Network Access).
2. Put the connection string in `server/.env` as `MONGODB_URI` (never commit it).
3. Set `CLIENT_ORIGINS` in `server/.env` to your deployed site URL(s) for production CORS.
4. When deploying the API, set `TRUST_PROXY=1` if it sits behind a proxy (Render, Railway, …), and set
   `VITE_API_URL` to the API's public URL when building the frontend.
5. Verify the connection: start the API and open `http://localhost:5000/api/health` — it should show `"db":"connected"`.

### Certificates & live links

* Certificate images: see `public/certificates/README.md` and the `certifications` list in `src/data/portfolio.ts`.
* Live demo buttons come from the `live` field of each project in `src/data/portfolio.ts`.
