"use client";

import { motion } from "framer-motion";
import { height } from "@/app/_lib/_animation/tocAnimation";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import { TOCLink } from "./TOCLink";

type TOCMobileContentProps = {
  nodes: ExtractedTOC[];
  activeId: string;
  setTocOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TOCMobileContent = ({
  nodes,
  activeId,
  setTocOpen,
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
              setTocOpen={setTocOpen}
            />
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default TOCMobileContent;
