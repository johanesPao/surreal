"use client";

import {
  IconSquareRoundedChevronsDownFilled,
  IconSquareRoundedChevronsUpFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import TOCMobileContent from "./TOCMobileContent";

export const TOCMobileComp = ({
  nodes,
  activeId,
}: {
  nodes: ExtractedTOC[];
  activeId: string;
}) => {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <motion.div className='fixed bg-cobalt-off-blue bottom-0 left-0 py-3 px-[5%] w-full text-sm z-[51] shadow-[0_20px_25px_5px_rgba(0,0,0,0.1),0_8px_10px_6px_rgba(0,0,0,0.1)]'>
      <div className='container relative overflow-clip flex justify-center'>
        {tocOpen ? (
          <IconSquareRoundedChevronsDownFilled
            className='absolute top-0 left-0 h-full cursor-pointer'
            size={19}
            onMouseDown={() => setTocOpen(!tocOpen)}
          />
        ) : (
          <IconSquareRoundedChevronsUpFilled
            className='absolute top-0 left-0 h-full cursor-pointer'
            size={19}
            onMouseDown={() => setTocOpen(!tocOpen)}
          />
        )}
        <motion.span className='py-2'>
          {!tocOpen && activeId
            ? nodes.filter((node) => node.id.replace("#", "") === activeId)[0]
                .value
            : "Table of Content"}
        </motion.span>
      </div>
      <AnimatePresence mode='wait'>
        {tocOpen && <TOCMobileContent nodes={nodes} activeId={activeId} />}
      </AnimatePresence>
    </motion.div>
  );
};
