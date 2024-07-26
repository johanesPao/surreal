import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import { getArtikel } from "@/app/_lib/_artikel/artikel";
import { ExtractedArtikelData } from "@/app/_types/extracted_artikel_data";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { frontMatter }: ExtractedArtikelData = await getArtikel(params);
  return {
    title: frontMatter.title,
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

  const dataArtikel: ExtractedArtikelData = await getArtikel(params);
  // import file MDX secara dinamis berdasar slug
  const MDXContent = dynamic(() => import(`@/(artikel)/${slug}.mdx`));

  return (
    <div className='relative h-full z-50 bg-cobalt-dusty-blue-950 flex flex-col'>
      <article className='pt-[72px] w-full z-[70] bg-cobalt-dusty-blue-950 text-[14px] lg:text-[16px]'>
        <MDXContent />
      </article>
    </div>
  );
}
