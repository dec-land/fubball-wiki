# Fubball Wiki

Community maintained wiki for [Fubball](https://fubball.com), published at [wiki.fubball.com](https://wiki.fubball.com). See [CONTRIBUTING.md](./CONTRIBUTING.md) or click **Edit this page** at the bottom of any article to open its `.mdx` source directly in GitHub's web editor.

## Stack

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com) via `@astrojs/starlight-tailwind`
- [Biome](https://biomejs.dev) for formatting and linting
- Static deployment on [Cloudflare Pages](https://pages.cloudflare.com)

## Local development

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm check     # astro check + biome check
pnpm build     # typecheck + static build into dist/
pnpm preview   # preview the built dist/ folder locally
```

## Cloudflare Pages setup

Connect `dec-land/fubball-wiki` in the Cloudflare Pages dashboard with:

- **Framework preset:** Astro
- **Build command:** `pnpm build`
- **Build output directory:** `dist`
- **Production branch:** `main`
