import '@/app/_css/globals.css'
import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import { getArtikel } from "@/app/_lib/_artikel/artikel";
import { ExtractedArtikelData } from "@/app/_types/extracted_artikel_data";
import { TableOfContents } from '@/komponen/tsx/TableOfContents';
import { auth } from '@/auth';
import ArtikelAuthorCard from '@/komponen/tsx/ArtikelAuthorCard';
import ArtikelComment from '@/komponen/tsx/ArtikelComment';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { frontMatter }: ExtractedArtikelData = await getArtikel(params);
  return {
    title: `${process.env.NAMA_SITUS} - ${frontMatter.title}`,
    description: frontMatter.title,
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("(artikel)"));
  const parameter = files.map((namaFile) => ({
    slug: namaFile.replace(".mdx", ""),
  }));

  return parameter;
}

export default async function Artikel({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const session = await auth();
  
  // import file MDX secara dinamis berdasar slug
  const MDXContent = dynamic(() => import(`@/(artikel)/${slug}.mdx`));
  // dataArtikel, terutama toc
  const dataArtikel: ExtractedArtikelData = await getArtikel(params);

  return (
    <div className='relative h-full z-50 bg-pitch-black flex flex-col'>
      <article className='pt-[72px] w-full z-[70] text-[14px] lg:text-[16px]'>
        <MDXContent />
        {dataArtikel.toc && <TableOfContents nodes={dataArtikel.toc} />}
        <ArtikelAuthorCard />
        <ArtikelComment session={session} artikelId={slug} />
      </article>
    </div>
  );
}
