import Link from "next/link"
import { Metadata, Route } from "next"
import { opsiStringDate } from "./_interface-props/_format.props"
import { getSemuaArtikel } from "./_lib/_artikel/artikel"
import { KategoriMap } from "./_types/kategori"

export default async function Beranda() {
  const daftarArtikel = await getSemuaArtikel()
  const mapKategori = KategoriMap

  return (
    <div>
          {daftarArtikel.map((artikel) => (
            <div key={artikel.slug} className=" first:pt-[20px] pb-[2px] last:pb-[20px] px-[5%] lg:px-[20%]">
              <Link
                className="text-[20px] font-bold text-pretty"
                href={`/artikel/${artikel.slug}` as Route}
              >
                {artikel.metadata.judul}
              </Link>
              <p className="text-[14px]">
                {new Date(artikel.metadata.dibuat).toLocaleDateString("en-ID", opsiStringDate)}
              </p>
              <div className="flex flex-row gap-2 italic items-baseline">
                {artikel.metadata.kategori.map(kategori => {
                  const itemKategori = mapKategori.find(item => item.nama === kategori)
                  return (
                    <div className="my-0.5">
                      {
                        itemKategori && (
                          <div className="flex flex-row gap-1 items-center">
                            {itemKategori.ikon}
                            {itemKategori.nama}
                        </div>
                        )
                      }
                    </div>
                  )  
                })}
              </div>
            </div>
          ))}
    </div>
  )
}