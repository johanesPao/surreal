import { ExtractedTOC } from "./extractedtoc";
import { FrontMatterArtikel } from "./frontmatter";

export type ExtractedArtikelData = {
  frontMatter: FrontMatterArtikel;
  toc?: ExtractedTOC[];
  content: string;
};
