import { getSemuaArtikel } from "../_lib/_artikel/artikel";
import ArtikelCard from "@/komponen/tsx/ArtikelCard";

export default async function Beranda() {
  const daftarArtikel = await getSemuaArtikel();

  return (
    <div className='flex flex-col gap-3'>
      {daftarArtikel.map((artikel) => (
        <ArtikelCard key={artikel.slug} artikel={artikel} />
      ))}
      <footer className='absolute bottom-0 flex w-full font-wotfard text-slate-500 font-thin justify-center pt-10 pb-4 opacity-70'>
        Johanes Pao 🐠 {new Date().getFullYear()}
      </footer>
    </div>
  );
}
