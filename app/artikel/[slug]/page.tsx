import fs from "fs"
import path from "path"
import dynamic from 'next/dynamic'
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { opsiStringDate } from "@/app/_interface-props/_format.props"
import { getArtikel } from "@/app/_lib/_artikel/artikel"
import { IconArrowLeft } from "@tabler/icons-react"
import { KategoriMap, TNamaKategori } from "@/app/_types/kategori"

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const artikel = await getArtikel(params)
    return {
        title: artikel.metadata.judul,
        description: artikel.metadata.judul
    }
}

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join("(artikel)"))
    const parameter = files.map(namaFile => ({
        slug: namaFile.replace(".mdx", "")
    }))

    return parameter
}

export default async function Page({ params }: { params: { slug: string}}) {
    const { slug } = params
    const mapKategori = KategoriMap

    const artikel = await getArtikel(params)
    // import file MDX secara dinamis berdasar slug
    const MDXContent = dynamic(() => import(`@/(artikel)/${slug}.mdx`))

    return (
        <div className="h-full z-50 bg-cobalt-dusty-blue-950 flex flex-col overflow-clip">
            <div className="sticky px-[5%] lg:px-[20%] top-0 flex flex-row py-[40px] bg-gradient-to-b from-cobalt-off-blue via-transparent via-95% to-transparent items-center w-full gap-4 z-[100]">
                <div className="hover:scale-125 cursor-pointer group transition-all">
                    <Link href="/">
                        <IconArrowLeft />
                    </Link>
                </div>
                <div className="flex flex-col gap-1 grow">
                    <h1 className="text-[24px] font-black">
                        {artikel.metadata.judul}
                    </h1>
                    <p>
                        {new Date(artikel.metadata.dibuat).toLocaleDateString("en-ID", opsiStringDate)}
                    </p>
                    <div className="flex flex-row gap-2 italic">
                        {artikel.metadata.kategori.map((kategori: TNamaKategori) => {
                            const itemKategori = mapKategori.find(item => item.nama === kategori)
                            return (
                                <div key={kategori}>
                                    {itemKategori && (
                                        <div className="flex flex-row gap-1">
                                            {itemKategori.ikon}
                                            {itemKategori.nama}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <article className="w-full z-[70] bg-cobalt-dusty-blue-950">
                <MDXContent />
            </article>
        </div>
    )
}