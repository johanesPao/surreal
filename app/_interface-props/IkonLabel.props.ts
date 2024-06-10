import { EModeKontak } from "@/app/_enums/enums";

export type ModeKontak = keyof typeof EModeKontak;

export interface IkonLabelProps {
  mode?: ModeKontak;
  teks?: string;
  warnaIkon?: string;
  warnaTeks?: string;
}
