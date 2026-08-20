# Phurinat Khrueatan — Geospatial Portfolio

A static React and Three.js portfolio built for GitHub Pages. It features an interactive geospatial globe, smooth scrolling, scroll-triggered animation, responsive layouts, and selected experience from NT GIS, TRD MA, and TRD Integrate.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Production checks

```bash
npm test
npm run lint
```

The production site is generated in `dist/`.

## Publish with GitHub Pages

1. Create a GitHub repository. Name it `YOUR_USERNAME.github.io` for a root portfolio URL, or use any repository name for `YOUR_USERNAME.github.io/REPOSITORY/`.
2. Push this project to the repository's `main` branch.
3. **Before the first workflow run**, open **Settings → Pages** in GitHub.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**. This one-time step creates the repository's Pages site.
5. Open the **Actions** tab and run (or re-run) **Deploy portfolio to GitHub Pages**.

If `Configure GitHub Pages` reports `Get Pages site failed: Not Found`, the one-time Pages setting in steps 3–4 has not been completed for that repository yet. Enable it and re-run the failed workflow; no code change or access token is needed.

Every later push to `main` automatically rebuilds and republishes the portfolio. The workflow can also be run manually from the Actions tab.

## First edits to make

- In `app/page.tsx`, replace `your-email@example.com` and `github.com/yourusername`.
- If you want a portrait, put it in `public/` and replace the `portrait-monogram` block.
- After the GitHub Pages URL is known, replace the relative `og:image` and `twitter:image` values in `index.html` with the full public URL to `og.png` for the most reliable social previews.

## Project structure

- `app/page.tsx` — portfolio content and Three.js interaction
- `app/globals.css` — complete visual system and responsive styling
- `src/main.tsx` — static React entry point
- `public/` — PK geospatial icon set, social preview, and static assets
- `.github/workflows/deploy-pages.yml` — automatic GitHub Pages deployment
- `vite.config.ts` — portable relative asset paths for both GitHub Pages URL formats
