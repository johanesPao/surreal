"use client";

import { useEffect, useState } from "react";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import { TOCLink } from "./TOCLink";

export const TableOfContents = ({ nodes }: { nodes: ExtractedTOC[] }) => {
  if (!nodes.length) {
    return null;
  }

  const [diDesktop, setDiDesktop] = useState<boolean | undefined>(undefined);
  const [lebarWindow, setLebarWindow] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLebarWindow(window.innerWidth);
      setDiDesktop(window.innerWidth >= 1024);
    }
    window.addEventListener("resize", () => {
      setLebarWindow(window.innerWidth);
    });

    return window.removeEventListener("resize", () => {});
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      lebarWindow && lebarWindow >= 1024
        ? setDiDesktop(true)
        : setDiDesktop(false);
    }
  }, [lebarWindow]);

  return (
    <>
      {diDesktop ? (
        <div className='fixed gap-2 top-10 right-0 pt-5 w-[20%] text-sm z-[51]'>
          <ul className='flex flex-col gap-3 list-none mr-10'>
            {nodes.map((node, index) => {
              return <TOCLink key={index} node={node} diDesktop />;
            })}
          </ul>
        </div>
      ) : (
        <div className='fixed bg-cobalt-off-blue gap-2 bottom-0 left-0 py-2 px-[5%] w-full text-sm z-[51]'>
          <ul className='flex flex-col gap-3 list-none mr-10 items-center'>
            {nodes.map((node, index) => {
              return <TOCLink key={index} node={node} />;
            })}
          </ul>
        </div>
      )}
    </>
  );
};
