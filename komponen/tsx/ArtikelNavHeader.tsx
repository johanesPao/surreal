"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowLeft, IconLogin, IconMenu, IconX } from "@tabler/icons-react";
import { opsiStringDate } from "@/app/_interface-props/_format.props";

import NavLayout from "@/komponen/tsx/NavLayout";
import { motion, AnimatePresence } from "framer-motion";
import { FrontMatterArtikel } from "@/app/_types/frontmatter";
import { Session } from "next-auth";
import { signal } from "@preact-signals/safe-react";
import Image from "next/image";

type ArticleNavHeaderProps = {
  frontMatter: FrontMatterArtikel;
  session: Session | null;
};

const navOpen = signal(false);

const ArticleNavHeader = ({ frontMatter, session }: ArticleNavHeaderProps) => {
  return (
    <motion.div
      className='fixed top-0 left-0 w-screen z-[100] flex flex-col px-4 py-1.5 bg-cobalt-off-blue justify-between items-baseline shadow-xl'
      initial={{
        y: -40,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.1,
        type: "spring",
        stiffness: 80,
        damp: 200,
        ease: "linear",
      }}
    >
      <div className='w-full flex flex-grow items-center py-1'>
        <div
          className='flex gap-1 cursor-pointer'
          onMouseDown={() => (navOpen.value = !navOpen.value)}
        >
          {navOpen.value ? <IconX /> : <IconMenu />}
        </div>
        <div className='flex gap-2 items-baseline flex-grow place-content-center'>
          <p className='text-xl font-bold font-wotfard'>{frontMatter.title}</p>
          <p className='text-[12px] hidden lg:block'>
            {new Intl.DateTimeFormat("en-ID", opsiStringDate).format(
              new Date(frontMatter.createdAt)
            )}
          </p>
        </div>
        <div className='flex gap-2 items-center'>
          {session?.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || ""}
              width={32}
              height={32}
              className='rounded-full'
              onMouseEnter={() =>
                console.log(`User ${session.user.name} is logged in`)
              }
            />
          ) : (
            <span>Sign In</span>
            // <IconLogin size={32} />
          )}
        </div>
      </div>
      <AnimatePresence mode='wait'>
        {navOpen.value && <NavLayout />}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArticleNavHeader;
