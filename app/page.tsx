import Link from "next/link"
import { Metadata, Route } from "next"
import { opsiStringDate } from "./_interface-props/_format.props"
import { getSemuaArtikel } from "./_lib/_artikel/artikel"

export default async function Beranda() {
  const daftarArtikel = await getSemuaArtikel()

  return (
    <div>
          {daftarArtikel.map((artikel) => (
            <div key={artikel.slug}>
              <Link
                className="text-[20px] font-bold text-pretty"
                href={`/artikel/${artikel.slug}` as Route}
              >
                {artikel.metadata.judul}
              </Link>
              <p className="text-[14px]">
                {new Date(artikel.metadata.dipublikasikan).toLocaleDateString("en-ID", opsiStringDate)}
              </p>
            </div>
          ))}
    </div>
  )
}