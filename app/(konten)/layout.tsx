import "@/app/_css/globals.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.min.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  inter,
  jetbrainsMono,
  robotoMono,
  inconsolata,
  wotfard,
  bizUDMincho,
} from "@/app/_fonts/fonts";

export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`
        ${inter.variable} 
        ${jetbrainsMono.variable} 
        ${robotoMono.variable} 
        ${inconsolata.variable}
        ${wotfard.variable}
        ${bizUDMincho.variable}
      `}
    >
      <head></head>
      <body>{children}</body>
    </html>
  );
}
