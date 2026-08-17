# Phurinat Khrueatan — Portfolio

A responsive personal portfolio for a Software Engineering student, developer, and GIS enthusiast. The experience combines a dark geospatial visual system, an interactive Three.js globe, smooth scrolling, scroll-triggered reveals, and mobile-friendly navigation.

## Highlights

- Interactive Three.js wireframe globe with orbital data nodes and drag controls
- Sections for interests, selected experience, capabilities, and contact
- Featured projects: NT GIS, TRD MA, and TRD Integrate
- Responsive layouts for desktop, tablet, and mobile
- Reduced-motion support and semantic navigation
- Custom Open Graph / social sharing artwork

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

## Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm start
```

## Customize before public launch

The visible portfolio content is in `app/page.tsx`, with styling in `app/globals.css`.

1. Replace `your-email@example.com` with the preferred public email address.
2. Replace `github.com/yourusername` with the real GitHub profile.
3. To use a portrait, add the image under `public/` and replace the `.portrait-monogram` block in `app/page.tsx` with an image element.
4. Update the project descriptions if more precise public details become available.

## Deploy

This project is configured for OpenAI Sites through `.openai/hosting.json` and can be republished from Codex. It is also a standard Node/Vite-compatible project and can be deployed to a suitable Cloudflare Workers-compatible host after running the production build.

Do not publish publicly until the placeholder contact links are replaced.
