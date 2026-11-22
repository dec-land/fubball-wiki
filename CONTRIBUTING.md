# Contributing to the Fubball Wiki

The Fubball Wiki is maintained by supporters. If you spot something new on the pitch, want to document a club's history, or notice an outdated detail, you can edit any page directly.

## Quick edits in your browser

Every page has an **Edit this page** link at the bottom. Clicking it:

1. Opens the `.mdx` file in GitHub's web editor.
2. Forks the repository to your GitHub account on your first edit.
3. Submits your changes as a pull request against `main`.

Cloudflare Pages builds a preview link on every pull request so reviewers can check formatting before merging.

## Larger edits locally

If you are adding multiple pages or want to preview changes as you write:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4321`. Before opening a pull request, run:

```bash
pnpm check
pnpm build
```

## Page format

Pages live under `src/content/docs/` as `.mdx` files with frontmatter:

```yaml
---
title: Page Title
description: Short summary shown in search results and link previews.
---
```

You can use `<Infobox variant="fa" title="F.A. Notice">...</Infobox>` anywhere in an `.mdx` file without importing it. Available variants: `fa`, `terrace`, `positive`, `negative`, `neutral`.

## What gets reviewed for

- **Accuracy:** Link to a match or note the season/day where helpful.
- **On-topic:** No promotional or off-topic content.
- **Images:** Keep files a reasonable size, relevant, and attributed if required.

## License

By contributing, you agree your contributions are licensed under the same terms as this repository.
