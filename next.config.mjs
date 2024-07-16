import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import prism from "remark-prism";
import createMDX from "@next/mdx";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.johanespao.dev",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.backblazeb2.com",
        port: "",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      [
        prism,
        {
          transformInlineCode: true,
          plugins: ["inline-color"],
        },
      ],
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, {behavior: 'wrap'}]
    ],
  },
});

export default withMDX(nextConfig);
