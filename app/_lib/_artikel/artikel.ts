import fs from "fs";
import path from "path";

import { getArtikelData } from "./parser";
import { ExtractedArtikelData } from "@/app/_types/extracted_artikel_data";
import matter from "gray-matter";
import { MetadataArtikel } from "@/app/_types/metadata";

export type Artikel = {
  slug: string;
  frontMatter: MetadataArtikel;
};

// interface MetadataArtikel {
//   judul: string;
//   dibuat: string;
//   dipublikasikan: boolean;
//   kategori: TNamaKategori[];
//   [key: string]: any; // Untuk properti dinamis lainnya
// }

export async function getSemuaArtikel(): Promise<Artikel[]> {
  const dir = path.join(process.cwd(), "(artikel)");
  const files = fs.readdirSync(dir);

  const artikelDipublikasikan = files.filter((namaFile) => {
    const fullPath = path.join(dir, namaFile);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    console.log(data);

    if (data.published) {
      return namaFile;
    }
    // const {
    //   frontMatter,
    // }: ExtractedArtikelData = require(`@/(artikel)/${namaFile}`);
    // console.log("frontMatter:", frontMatter);
    // if (frontMatter.published) {
    //   return namaFile;
    // }
  });

  console.log(artikelDipublikasikan);

  const artikel = artikelDipublikasikan.map((namaFile) => {
    const fullPath = path.join(dir, namaFile);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug: namaFile.replace(".mdx", ""),
      frontMatter: data as MetadataArtikel,
    };
    // console.log(namaFile);
    // const {
    //   frontMatter,
    // }: ExtractedArtikelData = require(`@/(artikel)/${namaFile}`);
    // return {
    //   slug: namaFile.replace(".mdx", ""),
    //   frontMatter,
    // };
  });

  // Sort tulisan berdasarkan descending order dibuat
  artikel.sort(
    (a, b) =>
      new Date(b.frontMatter.createdAt).getTime() -
      new Date(a.frontMatter.createdAt).getTime()
  );

  return artikel;
}

export async function getArtikel({
  slug,
}: {
  slug: string;
}): Promise<ExtractedArtikelData> {
  try {
    const { frontMatter, toc, content } = await getArtikelData({ slug });

    // console.log("frontMatter is:", frontMatter);
    // console.log(content);
    // console.log(slug);

    const mdxPath = path.join("(artikel)", `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file untuk slug ${slug} tidak ditemukan`);
    }

    // const { metadata } = await import(`@/(artikel)/${slug}.mdx`);

    return {
      frontMatter,
      toc,
      content,
    } satisfies ExtractedArtikelData;
  } catch (kesalahan) {
    console.error("Kesalahan fetching artikel: ", kesalahan);
    throw new Error(`Tidak bisa fetching artikel dengan slug ${slug}`);
  }
}
