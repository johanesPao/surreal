import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import { getArtikel } from "@/app/_lib/_artikel/artikel";
import HeaderArtikel from "@/komponen/tsx/HeaderArtikel";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const artikel = await getArtikel(params);
  return {
    title: artikel.metadata.judul,
    description: artikel.metadata.judul,
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("(artikel)"));
  const parameter = files.map((namaFile) => ({
    slug: namaFile.replace(".mdx", ""),
  }));

  return parameter;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const artikel = await getArtikel(params);
  // import file MDX secara dinamis berdasar slug
  const MDXContent = dynamic(() => import(`@/(artikel)/${slug}.mdx`));

  return (
    <div className='h-full z-50 bg-cobalt-dusty-blue-950 flex flex-col overflow-clip'>
      <HeaderArtikel metadata={artikel.metadata} />
      <article className='w-full z-[70] bg-cobalt-dusty-blue-950'>
        <MDXContent />
      </article>
    </div>
  );
}
