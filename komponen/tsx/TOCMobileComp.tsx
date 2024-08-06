"use client";

import {
  IconSquareRoundedChevronsDownFilled,
  IconSquareRoundedChevronsUpFilled,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import TOCMobileContent from "./TOCMobileContent";
import { signal } from "@preact-signals/safe-react";

const tocOpened = signal(false);

export const TOCMobileComp = ({
  nodes,
  activeId,
}: {
  nodes: ExtractedTOC[];
  activeId: string;
}) => {
  return (
    <motion.div className='fixed bg-cobalt-off-blue bottom-0 left-0 py-1 px-[5%] w-full text-sm z-[51] shadow-[0_20px_25px_5px_rgba(0,0,0,0.1),0_8px_10px_6px_rgba(0,0,0,0.1)]'>
      <div
        className='container relative overflow-clip flex justify-center group cursor-pointer'
        onMouseDown={() => {
          !tocOpened.value
            ? (tocOpened.value = true)
            : (tocOpened.value = false);
        }}
      >
        {tocOpened.value ? (
          <IconSquareRoundedChevronsDownFilled
            className='absolute top-0 left-0 h-full cursor-pointer'
            size={24}
          />
        ) : (
          <IconSquareRoundedChevronsUpFilled
            className='absolute top-0 left-0 h-full cursor-pointer'
            size={24}
          />
        )}
        <motion.span
          className={`${tocOpened.value ? "py-3 font-bold text-2xl" : "py-2"}`}
        >
          {!tocOpened.value && activeId
            ? nodes.filter((node) => node.id.replace("#", "") === activeId)[0]
                .value
            : "Table of Contents"}
        </motion.span>
      </div>
      <AnimatePresence mode='wait'>
        {tocOpened.value && (
          <TOCMobileContent
            nodes={nodes}
            activeId={activeId}
            tocOpened={tocOpened}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
