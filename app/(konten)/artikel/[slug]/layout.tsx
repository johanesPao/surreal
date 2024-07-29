import "@/app/_css/globals.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.min.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  jetbrainsMono,
  robotoMono,
  inconsolata,
  wotfard,
  bizUDMincho,
} from "@/app/_fonts/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { getArtikel } from "@/app/_lib/_artikel/artikel";
import ArticleNavHeader from "@/komponen/tsx/ArtikelNavHeader";
import { Suspense } from "react";
import { ExtractedArtikelData } from "@/app/_types/extracted_artikel_data";
import { TableOfContents } from "@/komponen/tsx/TableOfContents";
import FooterArtikel from "@/komponen/tsx/FooterArtikel";
import ArtikelAuthorCard from "@/komponen/tsx/ArtikelAuthorCard";
import ArtikelComment from "@/komponen/tsx/ArtikelComment";
import { auth } from "@/auth";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { frontMatter }: ExtractedArtikelData = await getArtikel(params);
  const session = await auth();

  return {
    title: frontMatter.title,
    description: frontMatter.title,
  };
}

const getSession = async () => {
  return await auth();
};

export default async function ArtikelLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  const dataArtikel: ExtractedArtikelData = await getArtikel(params);
  const session = await getSession();

  return (
    <html
      className={`
        ${jetbrainsMono.variable}
        ${robotoMono.variable}
        ${inconsolata.variable}
        ${wotfard.variable}
        ${bizUDMincho.variable}
      `}
    >
      <head></head>
      <body className='relative'>
        <Suspense fallback={<div className='text-7xl white'>LOADING!!</div>}>
          <ArticleNavHeader
            frontMatter={dataArtikel.frontMatter}
            session={session}
          />
          {dataArtikel.toc && <TableOfContents nodes={dataArtikel.toc} />}
          {children}
          <ArtikelAuthorCard />
          <ArtikelComment session={session} />
          <FooterArtikel />
        </Suspense>
      </body>
    </html>
  );
}
