"use client";

type ImageProps = {
  url: string;
  caption?: string;
};

export const ImageBlock = ({ url, caption = "" }: ImageProps) => {
  return (
    <div className='flex flex-col lg:flex-row bg-[#282828] py-5 px-[5%] lg:px-[20%] shadow-lg items-start lg:items-center gap-7'>
      <img
        className='rounded-lg border-[4px] border-[#339966] shadow-lg'
        src={url}
      />
      {caption !== "" && (
        <caption className='flex flex-row relative italic font-robotoMono text-slate-200 text-start opacity-40 grow'>
          <span className='absolute top-0 -left-9 text-9xl font-bizUDMincho opacity-[0.25]'>
            "
          </span>
          <span className='grow'>{caption}</span>
          {/* {`"${caption}"`} */}
        </caption>
      )}
    </div>
  );
};
