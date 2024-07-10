import {
  IconBrandNextjs,
  IconFileTypeXls,
  IconMarkdown,
} from "@tabler/icons-react";
import { ReactElement } from "react";

export type TNamaKategori = "mdx" | "nextjs" | "excel";

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
  {
    nama: "excel",
    ikon: <IconFileTypeXls color='#339966' />,
  },
];
