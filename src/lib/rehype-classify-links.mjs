import { visit } from "unist-util-visit";

const FUBBALL_ORIGIN = /^https?:\/\/fubball\.online(?:$|[/?#])/i;
const WIKI_ORIGIN = /^https?:\/\/wiki\.fubball\.online(?:$|[/?#])/i;
const EXTERNAL_PROTOCOL = /^https?:\/\//i;

/** @param {string} href */
const classifyHref = (href) => {
	if (FUBBALL_ORIGIN.test(href)) {
		return "fubball";
	}
	if (WIKI_ORIGIN.test(href)) {
		return "internal";
	}
	if (EXTERNAL_PROTOCOL.test(href)) {
		return "external";
	}
	return "internal";
};

/** @param {unknown} rel */
const parseRel = (rel) => {
	if (Array.isArray(rel)) {
		return rel;
	}
	if (typeof rel === "string") {
		return rel.split(/\s+/);
	}
	return [];
};

export default function rehypeClassifyLinks() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName !== "a") return;
			const href = node.properties?.href;
			if (typeof href !== "string" || href.length === 0) return;

			const kind = classifyHref(href);
			node.properties["data-link-kind"] = kind;

			if (kind === "fubball" || kind === "external") {
				node.properties.target = "_blank";
				const mergedRel = new Set([
					...parseRel(node.properties.rel).filter(Boolean),
					"noopener",
					"noreferrer",
				]);
				node.properties.rel = Array.from(mergedRel).join(" ");
			}
		});
	};
}
