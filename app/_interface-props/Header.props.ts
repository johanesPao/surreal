import { KontakProps } from "./Kontak.props";
import { TeksKetikanProps } from "./TeksKetikan.props";

export interface HeaderProps {
  /**
   * Nama pada header, merupakan komponen interface TeksKetikanProps.
   * Lihat komponen TeksKetikan untuk mendapatkan informasi mengenai
   * props TeksKetikan
   */
  nama: TeksKetikanProps;
  /**
   * Peran atau jabatan, merupakan komponen interface TeksKetikanProps.
   * Lihat komponen TeksKetikan untuk mendapatkan informasi mengenai
   * props TeksKetikan
   */
  jabatan: TeksKetikanProps;
  /**
   * Info deskripsi, merupakan komponen interface TeksKetikanProps.
   * Lihat komponen TeksKetikan untuk mendapatkan informasi mengenai
   * props TeksKetikan
   */
  infoDeskripsi: TeksKetikanProps;
  style?: React.CSSProperties
  /**
   * Tahun bulan dan hari untuk info komponen TimerUmur
   */
  tahun: number;
  bulan: number;
  hari: number;
  dataKontak: KontakProps["data"]
}
