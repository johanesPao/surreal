import { TNamaKategori } from "@/app/_types/kategori";
import fs from "fs"
import { Metadata } from "next";
import path from "path"

type Artikel = {
    slug: string;
    metadata: MetadataArtikel;
}

interface MetadataArtikel {
    judul: string;
    dibuat: string;
    dipublikasikan: boolean;
    kategori: TNamaKategori[];
    [key: string]: any // Untuk properti dinamis lainnya
}

export async function getSemuaArtikel(): Promise<Artikel[]> {
    const dir = path.join(process.cwd(), "(artikel)")
    const files = fs.readdirSync(dir)

    const artikelDipublikasikan = files.filter(namaFile => {
        const { metadata }: MetadataArtikel = require(`@/(artikel)/${namaFile}`)
        console.log(namaFile, metadata.dipublikasikan)
        if (metadata.dipublikasikan) {
            return namaFile
        }
    })

    console.log(artikelDipublikasikan)

    const artikel = artikelDipublikasikan.map(namaFile => {
        console.log(namaFile)
        const { metadata } = require(`@/(artikel)/${namaFile}`)
        return {
        slug: namaFile.replace(".mdx", ""),
        metadata
        }
    })

    // Sort tulisan berdasarkan descending order dibuat
    artikel.sort(
        (a, b) => 
        new Date(b.metadata.dibuat).getTime() -
        new Date(a.metadata.dibuat).getTime()
    )

    return artikel
}

export async function getArtikel({ slug }: { slug: string }) {
    try {
        const mdxPath = path.join("(artikel)", `${slug}.mdx`)
        if (!fs.existsSync(mdxPath)) {
            throw new Error(`MDX file untuk slug ${slug} tidak ditemukan`)
        }

        const { metadata } = await import(`@/(artikel)/${slug}.mdx`)

        return {
            slug,
            metadata
        }
    } catch (kesalahan) {
        console.error("Kesalahan fetching artikel: ", kesalahan)
        throw new Error(`Tidak bisa fetching artikel dengan slug ${slug}`)
    }
}