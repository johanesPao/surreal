import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import { fromMarkdown } from "mdast-util-from-markdown";
import util from "util";
import { toc, Result } from "mdast-util-toc";
import { Parent, Node } from "unist";
import { Link } from "mdast";
import { ExtractedTOC } from "@/app/_types/extractedtoc";
import { ExtractedArtikelData } from "@/app/_types/extracted_artikel_data";

function isParent(node: Node): node is Parent {
  return "children" in node;
}

function extractTOCLink(node: Node, depth = 0): ExtractedTOC[] {
  const extractedTOC: ExtractedTOC[] = [];

  if (node.type === "link") {
    const linkNode = node as Link;
    const url = linkNode.url || "";
    const id = url.replace("#", "");
    const text =
      linkNode.children && linkNode.children[0]
        ? (linkNode.children[0] as Node & { value: string }).value || ""
        : "";
    extractedTOC.push({ id, url, value: text, depth });
  }

  // recursive jika node adalah parent
  if (isParent(node)) {
    for (const child of node.children) {
      const newDepth = node.type === "listItem" ? depth + 1 : depth;
      extractedTOC.push(...extractTOCLink(child, newDepth));
    }
  }

  return extractedTOC;
}

export async function getArtikelData({
  slug,
}: {
  slug: string;
}): Promise<ExtractedArtikelData> {
  const fullPath = path.join(process.cwd(), "(artikel)", `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  // extract gray-matter artikel
  const { data, content } = matter(raw);

  // initiate array untuk menampung table of contents
  let extractedTOC: ExtractedTOC[] = [];

  // parse content dalam MDX
  const parsedMDX = await remark().process(content);

  // parse MDX menjadi AST (Abstract Syntax Tree)
  const tree = fromMarkdown(String(parsedMDX));

  // generate table of contents dari AST
  const tabelToc: Result = toc(tree);

  // jika tabelToc.map tidak undefined atau null, lakukan rekursi extractTOCLink untuk membentuk format
  // ExtractedTOC[]
  if (tabelToc.map) {
    extractedTOC = extractTOCLink(tabelToc.map);
  }

  return {
    frontMatter: {
      slug,
      title: data.title,
      createdAt: new Date(data.createdAt),
      published: data.published,
      categories: data.categories,
    },
    toc: extractedTOC.length > 0 ? extractedTOC : undefined,
    content,
  } satisfies ExtractedArtikelData;
}
