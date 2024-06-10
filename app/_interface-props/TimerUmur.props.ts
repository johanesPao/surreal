export interface TimerUmurProps {
    tahun: number;
    bulan: number;
    hari: number;
    jam?: number;
    menit?: number;
    bahasa?: string;
  }
  
  export interface IUmur {
    tahun: number;
    bulan: number;
    hari: number;
    jam: number;
    menit: number;
    detik: number;
  }
  
  export interface IKataTimer {
    tahun: string;
    bulan: string;
    hari: string;
    jam: string;
    menit: string;
    detik: string;
    [key: string]: string;
  }
  
  export enum EBahasaTimer {
    EN = "en",
    ID = "id",
  }
  
  export const bahasaTimerUmur = {
    en: {
      tahun: "years",
      bulan: "months",
      hari: "days",
      jam: "hours",
      menit: "minutes",
      detik: "seconds",
    },
    id: {
      tahun: "tahun",
      bulan: "bulan",
      hari: "hari",
      jam: "jam",
      menit: "menit",
      detik: "detik",
    },
  };
  