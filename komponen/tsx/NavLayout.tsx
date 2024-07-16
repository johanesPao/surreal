"use client";

import { motion } from "framer-motion";
import { height } from "@/app/_lib/_animation/navAnimation";

const NavLayout = () => {
  return (
    <motion.div
      className='flex flex-col w-full overflow-hidden text-6xl p-5 items-center'
      variants={height}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <p>Aiueo</p>
      <p>aIueo</p>
      <p>aiUeo</p>
      <p>aiuEo</p>
      <p>aiueO</p>
    </motion.div>
  );
};

export default NavLayout;
