import { getSemuaArtikel } from "./_lib/_artikel/artikel";
import ArtikelCard from "@/komponen/tsx/ArtikelCard";

export default async function Beranda() {
  const daftarArtikel = await getSemuaArtikel();

  return (
    <div>
      {daftarArtikel.map((artikel) => (
        <ArtikelCard key={artikel.slug} artikel={artikel} />
      ))}
    </div>
  );
}
