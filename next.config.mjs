import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js','jsx','ts','tsx','md','mdx'],
    experimental: {
        mdxRs: false
    }
};

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex]
    }
})

export default withMDX(nextConfig);
