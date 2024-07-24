"use client";

import { useEffect, useState } from "react";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import useDesktopOrMobile from "@/app/_lib/_hooks_wrapper/useDesktopOrMobile";

type fontSizeKey = { [key: string]: string };
type TOCLinkProps = {
  node: ExtractedTOC;
  activeId: string;
  setTocOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

export const TOCLink = ({
  node,
  activeId,
  setTocOpen = undefined,
}: TOCLinkProps) => {
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const { id, url, value, depth } = node;
  const [highlighted, setHighlighted] = useState(false);
  const [isDesktop] = useDesktopOrMobile();

  useEffect(() => {
    const elementActive = document.getElementById(id);

    if (elementActive && highlighted) {
      const { width, height, top, left } =
        elementActive.getBoundingClientRect();
      setDimension({ width, height, top, left });
    }
  }, [id]);

  useEffect(() => {
    setHighlighted(id === activeId);
  });

  const fontSize: fontSizeKey = {
    1: `text-[16px] font-bold`,
    2: `text-[14px] ml-4`,
    3: `text-[12px] ml-8`,
  };

  return (
    <li>
      <a
        href={url}
        className={`${
          highlighted ? "border-b-4 border-b-cobalt-off-blue-600" : ""
        } ${fontSize[depth.toString()]}`}
        onClick={(e) => {
          e.preventDefault();

          setHighlighted(true);

          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });

          if (!isDesktop && setTocOpen) {
            setTimeout(() => {
              setTocOpen(false);
            }, 850);
          }
        }}
      >
        {value}
      </a>
    </li>
  );
};
