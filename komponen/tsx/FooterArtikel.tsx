"use client";

import useDesktopOrMobile from "@/app/_lib/_hooks_wrapper/useDesktopOrMobile";

const FooterArtikel = () => {
  const [diDesktop] = useDesktopOrMobile();

  return (
    <footer
      className={`flex w-full font-geistMono text-slate-500 text-[0.9rem] font-thin justify-center pt-10 pb-4 ${
        !diDesktop && "mb-16"
      }`}
    >
      Johanes Pao 🐠 {new Date().getFullYear()}
    </footer>
  );
};

export default FooterArtikel;
