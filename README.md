# Arpit Portfolio — Next.js + TypeScript

A personal portfolio site built with the **Next.js App Router**. Each section on the page is a React component. Content is split between **static files** (easy to edit) and **live data** (Google Sheets, GitHub, LeetCode) loaded on the server when the home page renders.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command        | Purpose              |
| -------------- | -------------------- |
| `npm run dev`  | Local development    |
| `npm run build`| Production build     |
| `npm run start`| Run production build |
| `npm run lint` | ESLint               |

---

## How a page request works

```text
app/page.tsx
    │
    │  (server) calls getPortfolioData()
    ▼
lib/portfolio-data.ts
    ├── fetchExperienceFromGoogleSheet()  → Experience section
    ├── fetchProjectsFromGitHub()         → Projects section
    └── fetchLeetCodeProfile()            → LeetCode section
    │
    │  merges with static content from data/portfolio.ts
    ▼
app/App.tsx  →  renders all section components
```

Static fields (hero, about, stack, education, nav, contact, etc.) always come from `data/portfolio.ts`. Experience, projects, and LeetCode stats are **fetched in parallel**; if an env var is missing or a fetch fails, each module falls back to defaults defined in code.

---

## Folder structure

```text
Arpit/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # HTML shell, metadata, global CSS import
│   ├── page.tsx              # Home route — loads data, renders <App />
│   ├── App.tsx               # Composes all sections in order
│   ├── globals.css           # Theme, layout, terminal-style UI
│   └── icon.svg              # Favicon / app icons
│
├── components/               # One component per portfolio section
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx        # Props: experience[]
│   ├── Projects.tsx          # Props: projects[]
│   ├── LeetCode.tsx          # Props: leetcode
│   ├── Stack.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── ContactTerminal.tsx   # Contact UI helpers
│   ├── SectionHeader.tsx     # Shared section titles
│   └── TerminalBar.tsx       # Terminal-style chrome
│
├── data/
│   ├── portfolio.ts          # Static copy: nav, hero, metrics, stack, education, contact, LeetCode fallback
│   ├── manual-projects.ts    # Projects not on GitHub (always merged with GitHub repos)
│   └── types.ts              # TypeScript types for experience, projects, LeetCode
│
├── lib/                      # Server-side data fetching & utilities
│   ├── portfolio-data.ts     # Single entry: getPortfolioData()
│   ├── experience-from-sheet.ts
│   ├── projects-from-github.ts
│   ├── leetcode-from-api.ts
│   ├── google-sheets-url.ts
│   ├── parse-csv.ts
│   └── gmail-compose-url.ts
│
└── public/
    └── images/               # Project screenshots and static assets
```

Path alias `@/` points at the project root (see `tsconfig.json`), so imports look like `@/components/Hero`.

---

## Page layout (component tree)

Sections appear on the home page in this order:

```text
App
├── Navbar          → links from data/portfolio.ts (nav)
├── Hero            → hero, metrics, terminal lines
├── About           → about copy
├── Experience      → dynamic list (sheet or fallback)
├── Projects        → GitHub repos + manual-projects.ts
├── LeetCode        → live stats or static fallback
├── Stack           → tech stack
├── Education       → education entries
└── Contact         → contact / terminal UI
```

To reorder or hide a section, edit `app/App.tsx`.

---

## What to edit (cheat sheet)

| You want to change…              | Edit this |
| -------------------------------- | --------- |
| Name, tagline, email, socials    | `data/portfolio.ts` → `hero` |
| Nav labels / anchor links        | `data/portfolio.ts` → `nav` |
| About, stack, education, contact | `data/portfolio.ts` |
| A project that is not on GitHub  | `data/manual-projects.ts` |
| Work history (without a sheet)   | `data/portfolio.ts` → `fallbackExperience` |
| LeetCode UI when API is off      | `data/portfolio.ts` → `leetcode` |
| Section look & feel              | `app/globals.css` + relevant `components/*.tsx` |
| Which repos appear from GitHub   | `.env` → `GITHUB_USERNAME`, `GITHUB_REPO_EXCLUDE`, optional `GITHUB_TOKEN` |
| Experience from a spreadsheet    | `.env` → `GOOGLE_SHEETS_EXPERIENCE_CSV_URL` (CSV export; columns: `title`, `organization`, `time`, `bullets`; bullets can use `||` or newlines) |
| Live LeetCode stats              | `.env` → `LEETCODE_USERNAME` |

---

## Environment variables (optional)

Create a `.env.local` in the project root (do not commit secrets):

```env
# Experience — published Google Sheet CSV URL
GOOGLE_SHEETS_EXPERIENCE_CSV_URL=

# Projects — public GitHub username; comma-separated repo names to hide
GITHUB_USERNAME=
GITHUB_REPO_EXCLUDE=
GITHUB_TOKEN=          # optional; raises rate limits for GitHub API

# LeetCode — profile username for GraphQL stats
LEETCODE_USERNAME=
```

If a variable is unset, the site still builds and runs using fallbacks in `data/portfolio.ts` and `data/manual-projects.ts`.

---

## Extending the site later

- **More static content** — add fields to `portfolioStatic` in `data/portfolio.ts` and pass them through `App` or import directly in components (pattern used today for hero, stack, etc.).
- **New dynamic source** — add a fetcher under `lib/`, call it from `getPortfolioData()` in `lib/portfolio-data.ts`, extend `data/types.ts`, and pass props from `app/page.tsx` → `App` → your component.
- **CMS / database** — replace or wrap `getPortfolioData()`; keep section components prop-driven so the UI stays the same.

---

## Tech stack

- **Next.js** (App Router), **React**, **TypeScript**
- Styling: **CSS** in `app/globals.css` (no separate UI framework)

---

