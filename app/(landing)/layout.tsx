import "@/app/_css/globals.css";

import Header from "@/komponen/tsx/Header";
import {
  inter,
  jetbrainsMono,
  robotoMono,
  inconsolata,
  wotfard,
  bizUDMincho,
  monaspaceArgon,
  monaspaceKrypton,
  monaspaceNeon,
  monaspaceRadon,
  monaspaceXenon
} from "@/app/_fonts/fonts";

type Metadata = {
  title: {
    default: string;
    template: string;
  };
};

export const metadata: Metadata = {
  title: {
    default: `${process.env.NAMA_SITUS}`,
    template: `${process.env.NAMA_SITUS} | %s`,
  },
};

const title = metadata.title.default
  .replace("%s", metadata.title.default)
  .replace(
    "%d",
    process.env.NAMA_SITUS ? process.env.NAMA_SITUS : "Nama Situs",
  );

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex flex-col grow">
        {children}
      </main>
    </div>
  );
}
