import type { MDXComponents } from "mdx/types";
import YouTube from "@/komponen/mdx/youtube";
import { Heading, Heading2, Heading3, Heading4 } from "@/komponen/mdx/heading";
import { DrawChart } from "./komponen/mdx/drawchart";
import Spack from "./komponen/mdx/spack";
import SyntaxHighlight from "./komponen/mdx/syntaxhighlight";
import Mermaid from "./komponen/mdx/mermaid";
import Grid from "./komponen/mdx/grid";
import ExcelLine from "./komponen/mdx/excelline";
import { ImageBlock } from "./komponen/mdx/imageblock";
import BlockQuote from "./komponen/mdx/blockquote";

export function useMDXComponents(komponenMDX: MDXComponents): MDXComponents {
  return {
    ...komponenMDX,
    // komponen MDX custom
    YouTube,
    DrawChart,
    Spack,
    SyntaxHighlight,
    Mermaid,
    Grid,
    ExcelLine,
    ImageBlock,
    BlockQuote,
    // komponen pengganti default MDX
    h1: (props) => <Heading {...props} />,
    h2: (props) => <Heading2 {...props} />,
    h3: (props) => <Heading3 {...props} />,
    h4: (props) => <Heading4 {...props} />,
    p: (props) => (
      <p
        style={{
          fontVariantLigatures: "common-ligatures",
          fontFeatureSettings: "'liga', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'cv03', 'cv30', 'cv60', 'cv61', 'calt', 'zero', 'dlig'"
        }}
        className='first-letter:text-[1.15rem] px-[5%] lg:px-[20%] first-letter:font-bold text-[1rem]'
        {...props}
      />
    ),
  };
}
