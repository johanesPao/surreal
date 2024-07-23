"use client";

import useDesktopOrMobile from "@/app/_lib/_hooks_wrapper/useDesktopOrMobile";

const FooterArtikel = () => {
  const [diDesktop] = useDesktopOrMobile();

  return (
    <footer
      className={`flex w-full font-wotfard text-slate-500 font-thin justify-center pt-10 pb-4 ${
        !diDesktop && "mb-16"
      } opacity-70`}
    >
      Johanes Pao 🐠 {new Date().getFullYear()}
    </footer>
  );
};

export default FooterArtikel;
