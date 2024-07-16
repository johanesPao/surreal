"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type KategoriLayoutProps = {
  ikon: React.ReactElement;
  nama: string;
};

const KategoriLayout = ({ ikon, nama }: KategoriLayoutProps) => {
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div className='relative flex items-center'>
      {showToolTip && (
        <motion.div
          className='absolute right-7 bg-black/80 rounded-md p-1 px-3'
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            ease: "linear",
          }}
        >
          <div className='flex gap-1 font-bold font-wotfard'>
            <span>{nama}</span>
          </div>
        </motion.div>
      )}
      <div
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        {ikon}
      </div>
      {/* {showToolTip && (
        <div className='absolute w-fit bg-cyan-900 -translate-x-12'>
          {nama}
        </div>
      )} */}
    </div>
  );
};

export default KategoriLayout;
