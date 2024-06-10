export interface TeksKetikanProps {
    /**
     * Nilai dari teks yang akan digunakan komponen ini.
     * Bisa berupa string atau array string.
     */
    teks: string | string[];
    /**
     * Nilai kecepatan menulis karakter dalam milidetik.
     */
    kecepatanTulis?: number;
    /**
     * Nilai jeda antar array jika teks berupa string[]
     */
    jedaAntarArray?: number;
    /**
     * Nilai boolean pengulangan efek ketikan
     */
    loop?: boolean;
    /**
     * Nilai jeda antar loop string
     */
    jedaAntarLoop?: number;
    /**
     * Karakter yang akan digunakan sebagai kursor
     */
    kursor?: string;
    /**
     * Nilai kecepatan menghapus dalam milidetik
     */
    kecepatanHapus?: number;
    /**
     * String untuk css className
     */
    className?: string;
  }
  