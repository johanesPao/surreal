"use client";

import { useEffect, useRef, useState } from "react";

import { ExtractedTOC } from "@/app/_types/extractedtoc";
import { TOCDeskComp } from "./TOCDeskComp";
import { TOCMobileComp } from "./TOCMobileComp";
import useDesktopOrMobile from "@/app/_lib/_hooks_wrapper/useDesktopOrMobile";
import { signal } from "@preact-signals/safe-react";

const activeId = signal("");

export const TableOfContents = ({ nodes }: { nodes: ExtractedTOC[] }) => {
  if (!nodes.length) {
    return null;
  }

  const [diDesktop] = useDesktopOrMobile();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0% -25% 0%",
    });

    const elements = document.querySelectorAll("h2, h3, h4");

    elements.forEach((element) => {
      if (observer.current) {
        observer.current.observe(element);
      }
    });

    return () => observer.current?.disconnect();
  }, []);

  return (
    <>
      {diDesktop ? (
        <TOCDeskComp nodes={nodes} activeId={activeId.value} />
      ) : (
        <TOCMobileComp nodes={nodes} activeId={activeId.value} />
      )}
    </>
  );
};
