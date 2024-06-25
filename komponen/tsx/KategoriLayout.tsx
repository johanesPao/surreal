"use client";

import { KategoriMap, TNamaKategori } from "@/app/_types/kategori";

type KategoriLayoutProps = {
  metadata: any;
};

const KategoriLayout = ({ metadata }: KategoriLayoutProps) => {
  const mapKategori = KategoriMap;

  return (
    <div className='flex flex-row gap-2 italic items-baseline my-0.5'>
      {metadata.kategori.map((kategori: TNamaKategori) => {
        const itemKategori = mapKategori.find((item) => item.nama === kategori);
        return (
          <div key={kategori}>
            {itemKategori && (
              <div className='flex flex-row gap-1'>
                {itemKategori.ikon}
                {itemKategori.nama}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default KategoriLayout;
