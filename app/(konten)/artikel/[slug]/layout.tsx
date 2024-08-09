import "@/app/_css/globals.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.min.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Metadata, ResolvingMetadata } from "next";
import { getArtikel } from "@/app/_lib/_artikel/artikel";
import ArticleNavHeader from "@/komponen/tsx/ArtikelNavHeader";
import { ExtractedArtikelData } from "@/app/_types/extracted_artikel_data";
import { TableOfContents } from "@/komponen/tsx/TableOfContents";
import FooterArtikel from "@/komponen/tsx/FooterArtikel";
import ArtikelAuthorCard from "@/komponen/tsx/ArtikelAuthorCard";
import ArtikelComment from "@/komponen/tsx/ArtikelComment";
import { auth } from "@/auth";
import { getUserId } from "@/app/api/db/user";
import { InferAccount } from "@/schema";

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
  const user = session ? await getUserId(session?.user.provider as InferAccount['provider'], session?.user.id) :      undefined;
  let userId: string | undefined = undefined;
  if (session && user) {
    userId = user
  }

  return (
    <div className="relative">
      <ArticleNavHeader
        frontMatter={dataArtikel.frontMatter}
        session={session}
        userId={userId}
      />
      {dataArtikel.toc && <TableOfContents nodes={dataArtikel.toc} />}
      {children}
      <ArtikelAuthorCard />
      <ArtikelComment session={session} />
      <FooterArtikel />
    </div>
  );
}
