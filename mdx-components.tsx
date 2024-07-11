import type { MDXComponents } from "mdx/types";
import JSXTest from "@/komponen/mdx/jsxtest";
import YouTube from "@/komponen/mdx/youtube";
import { Heading, Heading2, Heading3 } from "@/komponen/mdx/heading";
import { DrawChart } from "./komponen/mdx/drawchart";
import Spack from "./komponen/mdx/spack";
import SyntaxHighlight from "./komponen/mdx/syntaxhighlight";
import Mermaid from "./komponen/mdx/mermaid";
import Grid from "./komponen/mdx/grid";
import ExcelLine from "./komponen/mdx/excelline";
import { ImageBlock } from "./komponen/mdx/imageblock";

export function useMDXComponents(komponenMDX: MDXComponents): MDXComponents {
  return {
    ...komponenMDX,
    // komponen MDX custom
    JSXTest,
    YouTube,
    DrawChart,
    Spack,
    SyntaxHighlight,
    Mermaid,
    Grid,
    ExcelLine,
    ImageBlock,
    // komponen pengganti default MDX
    h1: Heading,
    h2: Heading2,
    h3: Heading3,
    h4: (props) => <h4 className='text-xl font-medium pb-2' {...props} />,
    h5: (props) => <h5 className='text-lg font-normal pb-2' {...props} />,
    h6: (props) => <h6 className='text-base font-light pb-2' {...props} />,
    p: (props) => (
      <p
        className='px-[5%] lg:px-[20%] first-letter:text-3xl first-letter:font-bold'
        {...props}
      />
    ),
  };
}
