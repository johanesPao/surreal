"use client";

import { Artikel } from "@/app/_lib/_artikel/artikel";
import { Route } from "next";
import Link from "next/link";
import KategoriLayout from "./KategoriLayout";
import { opsiStringDate } from "@/app/_interface-props/_format.props";
import { KategoriMap, TNamaKategori } from "@/app/_types/kategori";

type ArtikelCardProps = {
  artikel: Artikel;
};

const ArtikelCard = ({ artikel }: ArtikelCardProps) => {
  const kategoriMap = KategoriMap;

  return (
    <div
      key={artikel.slug}
      className=' first:pt-[20px] pb-[2px] last:pb-[20px] px-[5%] lg:px-[30%] font-monaspaceKrypton'
    >
      <div className='flex'>
        <Link
          className='text-[22px] font-bold text-pretty'
          href={`/artikel/${artikel.slug}` as Route}
        >
          {artikel.frontMatter.title}
        </Link>
        <div className='grow flex gap-1 justify-end'>
          {artikel.frontMatter.categories.map((kategori) => {
            const itemKategori = kategoriMap.find(
              (item) => item.nama === kategori
            );
            if (itemKategori) {
              return (
                <div key={kategori}>
                  <KategoriLayout ikon={itemKategori.ikon} nama={kategori} />
                </div>
              );
            }
          })}
        </div>
      </div>
      <p className='text-[12px] font-monaspaceArgon' suppressHydrationWarning>
        {new Intl.DateTimeFormat("en-ID", opsiStringDate).format(
          new Date(artikel.frontMatter.createdAt)
        )}
      </p>
    </div>
  );
};

export default ArtikelCard;
