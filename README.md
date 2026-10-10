# Portfolio

Personal portfolio website of **Umanga Bhattarai**, showcasing selected projects and an animated about page.

Live site: **[https://bumang.github.io/portfolio/](https://bumang.github.io/portfolio/)**

## Tech Stack

- [Next.js 14](https://nextjs.org/) (Pages Router, static export)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) for scroll and page-transition animations

## Pages

- **Home** — landing page with falling stars and an infinite project slider
- **About** — scroll-driven sections, skills capsules, and timeline
- **Project pages** — dedicated pages for each project:
  - Diversio
  - Optimo Teams
  - Skyleap
  - Tigg
  - Xuno
  - Rara
  - R2PX

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)

### Install Dependencies

```bash
pnpm install
```

### Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

The site is statically exported to `./out`:

```bash
pnpm build
```

> When `NODE_ENV=production`, the app is built with a `/portfolio` base path and asset prefix so it works under the `bumang.github.io/portfolio/` URL.

## Deployment

Deployment is handled automatically by GitHub Actions (`.github/workflows/nextjs.yml`):

- Triggered on pushes to `main` (and manually via `workflow_dispatch`)
- Builds with `next build`, uploads `./out` as a Pages artifact, and publishes to GitHub Pages
- The workflow sets `NEXT_PUBLIC_PATH_PREFIX=/portfolio` and `NEXT_PUBLIC_API_URL=https://bumang.github.io/portfolio/`

## Project Structure

```
src/
├── components/      # shared UI components
├── context/         # app and page-transition context providers
├── features/        # feature-based modules (home, about, project, each project page)
├── layouts/         # page layouts
├── pages/           # Next.js Pages Router routes
├── styles/          # global styles
└── utils/           # helpers
```

## License

© 2026 Umanga Bhattarai. All rights reserved. This source code is provided for viewing purposes only and may not be copied, modified, or distributed without explicit permission.
