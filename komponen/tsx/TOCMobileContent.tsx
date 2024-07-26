"use client";

import { motion } from "framer-motion";
import { height } from "@/app/_lib/_animation/tocAnimation";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import { TOCLink } from "./TOCLink";
import { Signal } from "@preact-signals/safe-react";

type TOCMobileContentProps = {
  nodes: ExtractedTOC[];
  activeId: string;
  tocOpened: Signal<boolean>;
};

const TOCMobileContent = ({
  nodes,
  activeId,
  tocOpened,
}: TOCMobileContentProps) => {
  return (
    <motion.div
      className='flex flex-col list-none mr-10 items-center pb-4'
      variants={height}
      initial='initial'
      animate='open'
      exit='close'
    >
      <motion.ul className='flex flex-col gap-6'>
        {nodes.map((node, index) => {
          return (
            <TOCLink
              key={index}
              node={node}
              activeId={activeId}
              tocOpened={tocOpened}
            />
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default TOCMobileContent;
