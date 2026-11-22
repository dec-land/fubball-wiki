// @ts-check
import { rename } from "node:fs/promises";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";
import remarkInjectMdxComponents from "./src/lib/remark-inject-mdx-components.mjs";

/** @returns {import('astro').AstroIntegration} */
const renameSitemapIndex = () => ({
	name: "rename-sitemap-index",
	hooks: {
		"astro:build:done": async ({ dir }) => {
			const from = new URL("sitemap-index.xml", dir);
			const to = new URL("sitemap.xml", dir);
			try {
				await rename(from, to);
			} catch (err) {
				if (/** @type {NodeJS.ErrnoException} */ (err).code !== "ENOENT") {
					throw err;
				}
			}
		},
	},
});

export default defineConfig({
	site: "https://wiki.fubball.com",
	output: "static",
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		remarkPlugins: [remarkGfm, remarkInjectMdxComponents],
	},
	integrations: [
		starlight({
			title: "Fubball Wiki",
			description:
				"Community maintained wiki for Fubball guides, season schedule, club lore, and observed match mechanics.",
			customCss: ["./src/styles/fubball.css"],
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/dec-land/fubball-wiki",
				},
			],
			editLink: {
				baseUrl: "https://github.com/dec-land/fubball-wiki/edit/main/",
			},
			components: {
				SiteTitle: "./src/components/overrides/SiteTitle.astro",
				Footer: "./src/components/overrides/Footer.astro",
				ThemeProvider: "./src/components/overrides/ThemeProvider.astro",
				ThemeSelect: "./src/components/overrides/ThemeSelect.astro",
			},
			sidebar: [
				{
					label: "Guides",
					items: [
						{ label: "What is Fubball?", slug: "guides/getting-started" },
						{ label: "Weekly Season Cycle", slug: "guides/season-cycle" },
						{ label: "How to Contribute", slug: "guides/contributing" },
					],
				},
			],
		}),
		sitemap(),
		renameSitemapIndex(),
	],
});
