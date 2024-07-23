"use client";

import { motion } from "framer-motion";
import { height } from "@/app/_lib/_animation/tocAnimation";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import { TOCLink } from "./TOCLink";

const TOCMobileContent = ({
  nodes,
  activeId,
}: {
  nodes: ExtractedTOC[];
  activeId: string;
}) => {
  return (
    <motion.div
      className='flex flex-col gap-3 list-none mr-10 items-center'
      variants={height}
      initial='initial'
      animate='open'
      exit='close'
    >
      <motion.ul>
        {nodes.map((node, index) => {
          return <TOCLink key={index} node={node} activeId={activeId} />;
        })}
      </motion.ul>
    </motion.div>
  );
};

export default TOCMobileContent;
