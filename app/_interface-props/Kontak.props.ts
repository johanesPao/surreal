import { ModeKontak } from "./IkonLabel.props";

export interface KontakProps {
  data: DataKontak[];
  bgKontak?: string;
}

interface DataKontak {
  mode?: ModeKontak;
  teks?: string;
  warnaIkon?: string;
  warnaTeks?: string;
}
