import "@/app/_css/globals.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.min.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  inconsolata,
  robotoMono,
  jetbrainsMono,
  wotfard,
  bizUDMincho,
  monaspaceArgon,
  monaspaceKrypton,
  monaspaceNeon,
  monaspaceRadon,
  monaspaceXenon,
  geistSans,
  geistMono
} from '@/app/_fonts/fonts'
import { Metadata, ResolvingMetadata } from "next";
import { getArtikel } from "@/app/_lib/_artikel/artikel";
import ArticleNavHeader from "@/komponen/tsx/ArtikelNavHeader";
import { ExtractedArtikelData } from "@/app/_types/extracted_artikel_data";
import FooterArtikel from "@/komponen/tsx/FooterArtikel";
import { auth } from "@/auth";

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

export default async function ArtikelLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  const dataArtikel: ExtractedArtikelData = await getArtikel(params);
  const session = await auth();

  return (
    <div className={`
      relative 
      ${inconsolata.variable}
      ${robotoMono.variable}
      ${jetbrainsMono.variable}
      ${wotfard.variable}
      ${bizUDMincho.variable}
      ${monaspaceArgon.variable}
      ${monaspaceKrypton.variable}
      ${monaspaceNeon.variable}
      ${monaspaceRadon.variable}
      ${monaspaceXenon.variable}
      ${geistSans.variable}
      ${geistMono.variable}
    `}
    >
      <ArticleNavHeader
        frontMatter={dataArtikel.frontMatter}
        session={session}
      />
      {children}
      <FooterArtikel />
    </div>
  );
}
