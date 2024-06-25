"use client";

import { Artikel } from "@/app/_lib/_artikel/artikel";
import { Route } from "next";
import Link from "next/link";
import KategoriLayout from "./KategoriLayout";
import { opsiStringDate } from "@/app/_interface-props/_format.props";

type ArtikelCardProps = {
  artikel: Artikel;
};

const ArtikelCard = ({ artikel }: ArtikelCardProps) => {
  return (
    <div
      key={artikel.slug}
      className=' first:pt-[20px] pb-[2px] last:pb-[20px] px-[5%] lg:px-[20%]'
    >
      <Link
        className='text-[20px] font-bold text-pretty'
        href={`/artikel/${artikel.slug}` as Route}
      >
        {artikel.metadata.judul}
      </Link>
      <p className='text-[14px]'>
        {new Date(artikel.metadata.dibuat).toLocaleDateString(
          "en-ID",
          opsiStringDate
        )}
      </p>
      <KategoriLayout metadata={artikel.metadata} />
    </div>
  );
};

export default ArtikelCard;
