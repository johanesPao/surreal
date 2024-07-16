"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowLeft, IconMenu, IconX } from "@tabler/icons-react";
import { opsiStringDate } from "@/app/_interface-props/_format.props";

import NavLayout from "@/komponen/tsx/NavLayout";
import { motion, AnimatePresence } from "framer-motion";
import { opacity } from "@/app/_lib/_animation/navAnimation";

type ArtikelNavButton = {
  metadata: any;
};

const ArticleNavHeader = ({ metadata }: ArtikelNavButton) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <motion.div
      className='fixed top-0 left-0 w-screen z-[100] flex flex-col px-2 lg:px-4 py-1.5 bg-cobalt-off-blue justify-between items-baseline shadow-xl'
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
      <div className='w-full flex flex-grow'>
        <div
          className={`hover:scale-125 cursor-pointer group transition-all shadow-lg`}
        >
          <Link href='/'>
            <IconArrowLeft />
          </Link>
        </div>
        <div className='flex gap-2 items-baseline flex-grow place-content-center'>
          <p className='text-xl font-bold font-wotfard'>{metadata.judul}</p>
          <p className='text-[12px] hidden lg:block'>
            {new Intl.DateTimeFormat("en-ID", opsiStringDate).format(
              new Date(metadata.dibuat)
            )}
          </p>
        </div>
        <div
          className='flex gap-1 cursor-pointer'
          onMouseDown={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <IconX /> : <IconMenu />}
          {/* <motion.div variants={opacity} animate={!navOpen ? "closed" : "open"}>
            <IconX />
          </motion.div> */}
        </div>
      </div>
      <AnimatePresence mode='wait'>{navOpen && <NavLayout />}</AnimatePresence>
    </motion.div>
  );
};

export default ArticleNavHeader;
