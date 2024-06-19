import type { MDXComponents } from "mdx/types"
import JSXTest from "@/komponen/mdx/jsxtest"
import YouTube from '@/komponen/mdx/youtube'
import { Heading } from '@/komponen/mdx/heading'
import { DrawChart}  from "./komponen/mdx/drawchart"
import Spack from "./komponen/mdx/spack"

export function useMDXComponents(komponenMDX: MDXComponents): MDXComponents {
    return {
        ...komponenMDX,
        // komponen MDX custom
        JSXTest,
        YouTube,
        DrawChart,
        Spack,
        // komponen pengganti default MDX
        h1: Heading,
        h2: (props) => <h2 className="text-3xl font-bold pb-2" {...props} />,
        h3: (props) => <h3 className="text-2xl font-semibold pb-2" {...props} />,
        h4: (props) => <h4 className="text-xl font-medium pb-2" {...props} />,
        h5: (props) => <h5 className="text-lg font-normal pb-2" {...props} />,
        h6: (props) => <h6 className="text-base font-light pb-2" {...props} />,
    }
}