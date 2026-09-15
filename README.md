# Arpit Portfolio — Next.js + TypeScript

This version converts the supplied portfolio into a component-based Next.js App Router project.

## Architecture

- `app/App.tsx` — main composition/root component
- `app/page.tsx` — Next.js route that renders `<App />`
- `components/` — each portfolio section is a reusable component
- `data/portfolio.ts` — all portfolio content/data
- `app/globals.css` — original CSS/theme/design preserved

## Components

```text
App
├── Navbar
├── Hero
├── About
├── Experience
├── Projects
├── LeetCode
├── Stack
├── Education
└── Contact
```

## Make it dynamic later

Most content is already separated into `data/portfolio.ts`.

For example, to add another project:

```ts
projects: [
  {
    title: "New Project",
    status: "live",
    description: "Project description",
    tags: ["Next.js", "TypeScript", "MongoDB"],
  },
]
```

The `Projects` component automatically renders it.

Later, `data/portfolio.ts` can be replaced with:
- API/CMS data
- database data
- Sanity/Contentful/etc.
- MDX/JSON
- Next.js server-side data fetching

The component structure does not need to change.

## Run

```bash
npm install
npm run dev
```
