import { IconBrandNextjs, IconMarkdown } from "@tabler/icons-react";
import { ReactElement } from "react";

export type TNamaKategori = "mdx" | "nextjs";

type TKategori = {
  nama: TNamaKategori;
  ikon: ReactElement;
};

export const KategoriMap: TKategori[] = [
  {
    nama: "mdx",
    ikon: <IconMarkdown color='#fcb32c' />,
  },
  {
    nama: "nextjs",
    ikon: <IconBrandNextjs />,
  },
];
