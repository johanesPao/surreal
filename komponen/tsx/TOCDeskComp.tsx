"use client";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import { TOCLink } from "./TOCLink";

export const TOCDeskComp = ({
  nodes,
  activeId,
}: {
  nodes: ExtractedTOC[];
  activeId: string;
}) => {
  return (
    <div className='fixed gap-2 top-16 right-0 pt-5 w-[20%] text-sm z-[51]'>
      <ul className='flex flex-col gap-3 list-none mr-10'>
        {nodes.map((node, index) => {
          return <TOCLink key={index} node={node} activeId={activeId} />;
        })}
      </ul>
    </div>
  );
};
