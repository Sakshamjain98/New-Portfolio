# Saksham Jain — Developer Portfolio

**A sleek, editorial-style developer portfolio built with Next.js 16, Tailwind v4, and Motion.** Warm cream canvas, hairline depth, light-weight display type — and a signature day/night hero that swaps a live background video with smooth choreography.

![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-087EA4?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-Framer-0055FF?style=flat-square&logo=framer&logoColor=white)

![Portfolio hero — day mode](./project-images/Portfolio-Hero-Day.png)

---

## ✨ Features

- 🌗 **Interactive day/night switch in the hero** — a single toggle swaps a *day* background video for a *night* one, with choreographed transitions across the whole hero.
- 📍 **Live visitor location + real-time weather widget** — server-side geolocation and live weather, with zero API keys.
- 📊 **AI token-usage widget** — an animated stat card.
- 🎨 **Editorial "magazine-style" design system** — warm cream canvas, hairline borders instead of drop shadows, light-weight display type with negative tracking, and a single restrained orange accent.
- 🖼️ **Selected Work** — an animated project carousel.
- 🧩 **Capabilities** — a section powered by hand-crafted, animated icons.
- 🪜 **Approach / process**, a faux code-editor **Stack** section, plus **About** and **Contact**.
- 🧭 **Scroll-aware header** — a mobile menu and a smooth overlay → solid transition on scroll, with a footer to match.
- 🎬 **Choreographed scroll reveals** via a reusable `Reveal` component, with full `prefers-reduced-motion` support.
- 📱 **Fully responsive** and **content-centralized** — nearly all copy lives in one file.
- ▲ **Deploys to Vercel with zero config** — the location + weather widget goes live automatically once deployed.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router · Turbopack) |
| UI library | **React 19** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** (CSS-first config) |
| Components | **shadcn/ui** |
| Animation | **Motion** (Framer Motion) via `motion/react` |
| Icons | **@phosphor-icons/react** |
| Theming | **next-themes** |
| Fonts | **Geist** + **Geist Mono** |
| Weather API | **Open-Meteo** (free · keyless) |
| Geolocation | **Vercel geo headers** in prod · **ipapi.co** fallback in dev |
| Package manager | **Bun** (npm / pnpm / yarn also work) |

> 🔑 **No API keys, no `.env` file, nothing to sign up for.** The weather and location features run entirely on free, keyless services.

---

## 📁 Project Structure

```
Nextjs-Developer-Portfolio/
├─ app/                  # App Router: pages, layout.tsx, globals.css (design tokens)
├─ components/           # Portfolio sections (hero, selected-work, capabilities…)
│  ├─ ui/                # shadcn/ui primitives
│  └─ widgets/           # Location + weather and token-usage widgets
├─ lib/
│  ├─ content.ts         # ⭐ All site copy, projects, and links — main edit point
│  ├─ prompts.md         # 🎨 AI prompts used to generate the day/night hero image + video
│  ├─ weather.ts         # Open-Meteo weather fetching
│  └─ location.ts        # Server geolocation (Vercel headers + ipapi.co fallback)
├─ public/assets/        # Hero videos, posters, and project images
└─ project-images/       # Screenshots used in this README
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/Sakshamjain98/New-Portfolio.git
cd New-Portfolio
```

### 1. Install dependencies

```bash
bun install       # or: npm install / pnpm install / yarn
```

### 2. Start the dev server

```bash
bun dev           # or: npm run dev / pnpm dev / yarn dev
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Build for production

```bash
bun run build     # or: npm run build
bun run start     # or: npm run start — serve the production build locally
```

---

## 🎨 Editing content

| What to change | Where |
|---|---|
| ✍️ **Copy, projects, links** (nav, work, capabilities, stack, footer) | `lib/content.ts` |
| 🖼️ **Hero videos, posters, project images** | `public/assets/` |
| 🎨 **Colors, fonts, spacing** (design tokens) | `app/globals.css` — the `@theme` block |
| 🧾 **Site metadata** (title, description, social preview) | `app/layout.tsx` |

---

## ▲ Deploy to Vercel

1. Push to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and **import** the repository.
3. Click **Deploy** — no environment variables required.

---

## 📜 Scripts

| Command | What it does |
|---|---|
| `bun dev` | Start the local dev server (Turbopack) |
| `bun run build` | Create an optimized production build |
| `bun run start` | Serve the production build locally |
| `bun run lint` | Run ESLint |
| `bun run format` | Format files with Prettier |
| `bun run typecheck` | Type-check with `tsc --noEmit` |

---

## 📸 Screenshots

### 🌙 Hero — Night mode
![Portfolio hero — night mode](./project-images/Portfolio-Hero-Night.png)

### 🗂️ Selected Work
![Selected Work section](./project-images/Portfolio-Selected-Work-Section.png)

### 🧩 Capabilities
![Capabilities section](./project-images/Portfolio-Capabilities-Section.png)

### 🪜 Approach
![Approach section](./project-images/Portfolio-Approach-Section.png)

### 💻 Stack
![Stack section](./project-images/Portfolio-Stack-Section.png)

### ✉️ Contact
![Contact section](./project-images/Portfolio-Contact-Section.png)

### 🔻 Footer
![Footer section](./project-images/Portfolio-Footer-Section.png)

---

## 👤 Author

**Saksham Jain** — Full-stack Web Developer, 2+ years of experience building and delivering scalable products fast, using Claude Code AI agents throughout development.

- 🌐 Website — [sakshamjain.codes](https://sakshamjain.codes)
- ✉️ Email — [sakshamjaindevs@gmail.com](mailto:sakshamjaindevs@gmail.com)
- 🐙 GitHub — [github.com/Sakshamjain98](https://github.com/Sakshamjain98)
