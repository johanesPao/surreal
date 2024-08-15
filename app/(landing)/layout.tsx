import "@/app/_css/globals.css";

import Header from "@/komponen/tsx/Header";

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
      <footer className='absolute bottom-0 w-screen font-wotfard text-slate-500 font-thin text-center pt-10 pb-4 text-[10px]'>
        Johanes Pao 🐠 {new Date().getFullYear()}
      </footer>
    </div>
  );
}
