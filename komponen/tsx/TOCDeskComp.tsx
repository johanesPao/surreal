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
    <div className='fixed gap-2 top-12 right-0 pt-5 w-[17.5%] z-[51]'>
      <ul className='flex flex-col gap-3 list-none mr-10'>
        {nodes.map((node, index) => {
          return <TOCLink key={index} node={node} activeId={activeId} />;
        })}
      </ul>
    </div>
  );
};
