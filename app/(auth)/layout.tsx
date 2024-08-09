import "@/app/_css/globals.css";
import {
  jetbrainsMono,
  robotoMono,
  inconsolata,
  wotfard,
  bizUDMincho,
} from "@/app/_fonts/fonts";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${process.env.NAMA_SITUS} - Sign In`
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
