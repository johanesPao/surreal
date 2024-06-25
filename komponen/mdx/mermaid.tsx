"use client";

import mermaid from "mermaid";
import { useEffect } from "react";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
});

type MrMaidProps = {
  chart: string;
};

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
});

const Mermaid = ({ ...props }: MrMaidProps) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  const { chart } = props;

  return (
    <div
      className='mermaid bg-[#282828] flex flex-col shadow-lg py-0.5 px-[5%] lg:px-[20%] items-center'
      suppressHydrationWarning
    >
      {chart}
    </div>
  );
};

export default Mermaid;
