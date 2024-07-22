"use client";

import {
  type ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

import { ExtractedTOC } from "@/app/_types/extractedtoc";

type fontSizeKey = { [key: string]: string };
type TOCLinkProps = {
  node: ExtractedTOC;
  diDesktop?: boolean;
};

const useHighlighted = (
  id: string
): [boolean, Dispatch<SetStateAction<string>>] => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0% -25% 0%",
    });

    const elements = document.querySelectorAll("h2, h3, h4");

    elements.forEach((elem) => {
      if (observer.current) {
        observer.current.observe(elem);
      }
    });

    return () => observer.current?.disconnect();
  }, []);

  return [activeId === id, setActiveId];
};

export const TOCLink = ({ node, diDesktop = false }: TOCLinkProps) => {
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const { id, url, value, depth } = node;
  const [highlighted, setHighlighted] = useHighlighted(id);

  useEffect(() => {
    const elementActive = document.getElementById(id);

    if (elementActive && highlighted) {
      const { width, height, top, left } =
        elementActive.getBoundingClientRect();
      setDimension({ width, height, top, left });
    }
  }, [id]);

  const fontSize: fontSizeKey = {
    1: `text-[16px] font-bold`,
    2: `text-[14px] ml-4`,
    3: `text-[12px] ml-8`,
  };

  return (
    <li
      className={`${!diDesktop ? (highlighted ? "block" : "hidden") : "block"}`}
    >
      <a
        href={url}
        className={`${
          highlighted ? "border-b-4 border-b-cobalt-off-blue-600" : ""
        } ${fontSize[depth.toString()]}`}
        onClick={(e) => {
          e.preventDefault();
          setHighlighted(id);
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        + {value}
      </a>
    </li>
  );
};
