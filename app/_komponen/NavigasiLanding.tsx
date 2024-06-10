'use client'

import Link from 'next/link'
import { LinkMenuProps } from "../_interface-props/LinkMenu.props"
import { Route } from 'next'
import React from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import '@/app/_ui/navigasi.css'

const NavigasiLanding = () => {
    const linkMenu: LinkMenuProps[] = [
        {
            url: "/",
            teks: "posts"
        },
        {
            url: "/kategori",
            teks: "categories"
        },
        {
            url: "/arsip",
            teks: "archives"
        },
        {
            url: "/tentang",
            teks: "about"
        }
    ]

    return (
        <div className="text-sm">
            <div className="lg:hidden">
                {linkMenu.map((item, indeks) => {
                    return (
                        <React.Fragment key={indeks}>
                            <Link className="text-emerald-400 hover:animate-pulse hover:duration-75 hover:text-teks hover:transition-all" href={item.url as Route}>{item.teks}</Link>
                            {indeks === linkMenu.length - 1 ? null : "   /   "}
                        </React.Fragment>
                    )
                })}
            </div>
            <div className="hidden lg:flex lg:flex-col lg:justify-between lg:space-y-4">
                {linkMenu.map((item, indeks) => {
                    return (
                        <Link className="text-emerald-400 hover:animate-pulse hover:duration-75 hover:text-teks hover:transition-all" key={indeks} href={item.url as Route}>
                            {item.teks}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default NavigasiLanding