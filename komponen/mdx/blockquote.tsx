"use client";

import { PiEmpty } from "react-icons/pi";
import { GrInfo } from "react-icons/gr";
import { TbFaceIdError } from "react-icons/tb";

type BlockQuoteProps = {
  tipe?: "default" | "info" | "warning";
  judul: string;
  konten: string;
};

type BlockQuoteSchemaProps = {
  ikon: React.ReactElement;
  warnaBorder: string;
  warnaBackground: string;
};

const BlockQuote = ({ tipe = "default", judul, konten }: BlockQuoteProps) => {
  // define color schema
  let defaultSchema: BlockQuoteSchemaProps = {
    ikon: <PiEmpty size={40} color={``} />,
    warnaBorder: "border-slate-700/100",
    warnaBackground: "bg-slate-400/60",
  };

  switch (tipe) {
    case "info":
      defaultSchema = {
        ikon: <GrInfo size={40} color={`#FFDE4D`} className='-z-100' />,
        warnaBorder: "border-cobalt-off-blue-800/100",
        warnaBackground: "bg-cobalt-blue-400/60",
      };
      break;
    case "warning":
      defaultSchema = {
        ikon: <TbFaceIdError size={40} color={``} />,
        warnaBorder: "border-red-600/100",
        warnaBackground: "bg-red-400/60",
      };
      break;
    default:
      break;
  }

  return (
    <div className='px-[5%] lg:px-[30%] p-5'>
      <div
        className={`group relative overflow-clip rounded-md border-l-[18px] ${defaultSchema.warnaBorder} ${defaultSchema.warnaBackground} p-4`}
      >
        <span className='absolute top-0 right-0 p-3 rotate-[30deg] opacity-50 scale-90 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:animate-pulse group-hover:duration-200'>
          {defaultSchema.ikon}
        </span>
        <p className='font-bold text-xl pb-2'>{judul}</p>
        {konten.split("<br />").map((paragraf, index) => (
          <p key={index}>{paragraf}</p>
        ))}
      </div>
    </div>
  );
};

export default BlockQuote;
