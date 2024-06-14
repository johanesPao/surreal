// @ts-check

/** 
 * @type {import('next').NextConfig} 
 **/

const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        typedRoutes: true
    }
}

const withMDX = require('@next/mdx')()

module.exports = withMDX(nextConfig)