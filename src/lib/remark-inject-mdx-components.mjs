import { Parser } from "acorn";
import { visit } from "unist-util-visit";

/** @type {Record<string, string>} */
const COMPONENTS = {
	Infobox: 'import Infobox from "@/components/mdx/Infobox.astro";',
	SupportersList:
		'import SupportersList from "@/components/mdx/SupportersList.astro";',
};

export default function remarkInjectMdxComponents() {
	return (tree) => {
		const used = new Set();

		visit(tree, (node) => {
			if (
				(node.type === "mdxJsxFlowElement" ||
					node.type === "mdxJsxTextElement") &&
				node.name &&
				Object.hasOwn(COMPONENTS, node.name)
			) {
				used.add(node.name);
			}
		});

		if (used.size === 0) return;

		tree.children = tree.children.filter((child) => {
			if (child.type !== "mdxjsEsm") return true;
			for (const name of used) {
				if (new RegExp(`\\bimport\\s+${name}\\b`).test(child.value)) {
					return false;
				}
			}
			return true;
		});

		for (const name of used) {
			const code = COMPONENTS[name];
			const estree = Parser.parse(code, {
				sourceType: "module",
				ecmaVersion: "latest",
			});
			tree.children.unshift({
				type: "mdxjsEsm",
				value: code,
				data: { estree },
			});
		}
	};
}
