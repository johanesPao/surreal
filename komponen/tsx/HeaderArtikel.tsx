"use client";

import { opsiStringDate } from "@/app/_interface-props/_format.props";

type HeaderArtikelProps = {
  metadata: any;
};

const HeaderArtikel = ({ metadata }: HeaderArtikelProps) => {
  return (
    <div className='px-[5%] lg:px-[30%] top-0 flex flex-row py-[40px] bg-gradient-to-b from-cobalt-off-blue via-transparent via-95% to-transparent items-center w-full gap-4'>
      <div className='flex flex-col gap-1 grow'>
        <h1 className='text-[24px] font-black text-6xl'>{metadata.judul}</h1>
        <p>
          {new Intl.DateTimeFormat("en-ID", opsiStringDate).format(
            new Date(metadata.dibuat)
          )}
        </p>
      </div>
    </div>
  );
};

export default HeaderArtikel;
