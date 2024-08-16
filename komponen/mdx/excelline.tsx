"use client";

import { motion } from "framer-motion";

type ExcelLineProps = {
  children: string;
};

const ExcelLine = ({ children }: ExcelLineProps) => {
  return (
    <motion.span
      className='relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-1 before:bg-[#339966] before:opacity-50 before:rounded-s -z-10'
      whileInView={{
        opacity: [0, 1],
        y: [-50, 0],
        transition: {
          duration: 2.5,
          type: "spring",
          ease: "easeInOut",
        },
      }}
    >
      <span className='relative font-inconsolata'>{children}</span>
    </motion.span>
  );
};

export default ExcelLine;
