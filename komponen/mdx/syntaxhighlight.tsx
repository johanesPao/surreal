"use client";

import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type SyntaxProps = {
  bahasa: string;
  kode: string;
};

const SyntaxHighlight = ({ ...props }: SyntaxProps) => {
  const [diDesktop, setDiDesktop] = useState<boolean | undefined>(undefined);
  const [lebarWindow, setLebarWindow] = useState<number | undefined>(undefined);
  const { bahasa, kode } = props;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Inisiasi lebarWindow pada render pertama
      setLebarWindow(window.innerWidth);
      // Inisiasi diDekstop pada render pertama
      if (window.innerWidth >= 1024) {
        setDiDesktop(true);
      } else {
        setDiDesktop(false);
      }
      // Registrasi event listener untuk resize saat render pertama
      window.addEventListener("resize", () => {
        setLebarWindow(window.innerWidth);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Evaluasi lebarWindow pada saat terjadi perubahan pada lebarWindow
      lebarWindow && lebarWindow >= 1024
        ? setDiDesktop(true)
        : setDiDesktop(false);
    }
  }, [lebarWindow]);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row px-[5%] lg:px-[20%] w-0'>
        <span className='px-4 py-0.5 bg-stone-900/100 font-inconsolata text-[1rem] rounded-tl-lg rounded-tr-lg'>
          {bahasa.toUpperCase()}
        </span>
      </div>
      <SyntaxHighlighter
        customStyle={{
          margin: "0",
          background: "rgb(28,25,23,1)",
          paddingLeft: diDesktop ? "30%" : "5%",
          paddingRight: diDesktop ? "30%" : "5%",
        }}
        language={bahasa}
        style={gruvboxDark}
        className='text-[0.8rem] mt-0 shadow-lg px-[5%] lg:px-[30%]'
        showLineNumbers
      >
        {kode}
      </SyntaxHighlighter>
    </div>
  );
};

export default SyntaxHighlight;
