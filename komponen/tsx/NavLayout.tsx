"use client";

import { motion } from "framer-motion";
import { height } from "@/app/_lib/_animation/navAnimation";
import Link from "next/link";

const NavLayout = () => {
  return (
    <motion.div
      className='flex flex-col w-full overflow-hidden text-2xl lg:text-5xl p-5 items-center font-monaspaceKrypton'
      variants={height}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <Link href='/arsip'>Archives</Link>
      <Link href='/kategori'>Categories</Link>
      <Link href='/proyek'>Projects Showcase</Link>
      <Link href='/whoami'>whoami</Link>
    </motion.div>
  );
};

export default NavLayout;
