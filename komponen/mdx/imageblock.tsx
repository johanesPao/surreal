"use client";

import { Suspense } from "react";

type ImageProps = {
  url: string;
  caption?: string;
};

export const ImageBlock = ({ url, caption = "" }: ImageProps) => {
  return (
    <div className='flex flex-col lg:flex-row bg-stone-900/100 py-5 px-[5%] lg:px-[20%] shadow-lg items-start lg:items-center gap-7'>
      <Suspense fallback={<span>Loading image</span>}>
        <img
          className='rounded-lg border-[4px] border-[#339966] shadow-lg'
          src={url}
        />
      </Suspense>
      {caption !== "" && (
        <div className='flex flex-row relative italic font-robotoMono text-slate-200 text-start opacity-40 grow'>
          <span className='absolute top-0 -left-9 text-9xl font-bizUDMincho opacity-[0.25]'>
            "
          </span>
          <span className='grow text-[12px]'>{caption}</span>
        </div>
      )}
    </div>
  );
};
