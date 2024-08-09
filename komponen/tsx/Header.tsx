"use client";

import { motion } from "framer-motion";
import TeksKetikan from "@/komponen/tsx/TeksKetikan";
import { IconBackslash, IconMap2 } from "@tabler/icons-react";

const Header = () => {
  return (
    <div className='h-auto py-[20px] px-[5%] lg:px-[30%] bg-pitch-black w-full flex flex-col gap-1 justify-between sticky top-0 z-10'>
      <div className='flex flex-row'>
        <div className='grow'>
          <motion.strong
            className='font-monaspaceKrypton text-[30px]'
            whileInView={{
              opacity: 1,
            }}
          >
            {`Johanes Pao`}
          </motion.strong>
          <div className='flex flex-row gap-1 font-monaspaceNeon'>
            <IconBackslash />
            <TeksKetikan
              teks={[
                "Loving Husband and Father",
                "Data Enthusiast",
                "Data Visualizer",
                "Data Transformer",
                "Data Trainer",
              ]}
              loop
              kursor='_'
            />
          </div>
        </div>
        <div className='flex flex-col justify-around group cursor-pointer hover:animate-pulse z-10'>
          <div className='rounded-md'>
            <IconMap2 className='' size={36} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
