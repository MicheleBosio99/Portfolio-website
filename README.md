# Portfolio

A modern, responsive portfolio website built with React and TypeScript, showcasing my projects and skills.

## Tech Stack

- **React** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript
- **HTML/CSS** - Structure and styling
- **Vercel** - Deployment and hosting platform

## Live

The portfolio is live at: [Michele Bosio Portfolio](https://michele-bosio-portfolio.vercel.app/)

## Features

- Fast loading times with optimized performance
- Type-safe code with TypeScript
- Project showcase
- Contact information

## Installation

1. Clone the repository:
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

To check the production build locally (this is what Vercel runs, and it
type-checks — a TypeScript error fails the deploy even though `dev` ignores it):
```bash
npm run build
npm run preview
```

## Deployment

This portfolio is automatically deployed to Vercel. Any push to the main branch triggers a new deployment.

## Live GitHub activity (Timeline page)

The Timeline page shows a contribution heatmap and a recent-activity feed. The
contribution calendar is only available through GitHub's **GraphQL** API, which
always requires a token — so the call is made server-side by the Vercel
Serverless Function in `api/contributions.js`. The token never reaches the
browser.

### One-time setup

1. **Create a token** — GitHub → Settings → Developer settings → Personal access
   tokens → *Fine-grained token*, with the **`read:user`** account permission.
   Nothing more is needed.
2. **Add it to Vercel** — project → Settings → Environment Variables →
   `GITHUB_TOKEN` = the token. Add it for Production and Preview.
3. **Redeploy.**

Optionally set `GITHUB_LOGIN` if the username ever changes; it defaults to
`MicheleBosio99`.

For private work to be counted in the heatmap totals, also enable
GitHub → Settings → Profile → **"Include private contributions on my profile"**.

### Rules

- **Never commit the token.** `.env` and `.env.*` are gitignored; keep it that
  way. A leaked token cannot be un-leaked by deleting the commit — revoke it on
  GitHub instead.
- Private repositories are reduced to counts and an anonymous
  "a private project" label. Repo names and commit messages from private repos
  are never sent to the browser.

### Local development

`npm run dev` runs Vite only, which has no `/api` routes, so the Timeline shows
a neutral "unavailable" placeholder. That is expected. To exercise the function
locally, use the Vercel CLI with a `.env.local` containing `GITHUB_TOKEN`:

```bash
npx vercel dev
```

### Caching

Responses are cached at the edge for 30 minutes
(`s-maxage=1800, stale-while-revalidate=86400`), so GitHub is called roughly
twice an hour regardless of traffic — far inside the 5,000 requests/hour limit
for an authenticated token.