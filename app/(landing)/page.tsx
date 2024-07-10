import { getSemuaArtikel } from "../_lib/_artikel/artikel";
import ArtikelCard from "@/komponen/tsx/ArtikelCard";

export default async function Beranda() {
  const daftarArtikel = await getSemuaArtikel();

  return (
    <div className='flex flex-col gap-3'>
      {daftarArtikel.map((artikel) => (
        <ArtikelCard key={artikel.slug} artikel={artikel} />
      ))}
    </div>
  );
}
