'use client'
import IkonLabel from "./IkonLabel";
import { KontakProps } from "@/app/_interface-props/Kontak.props";

const Kontak = ({ data = [] }: KontakProps) => {
  return (
    <div className="flex flex-row lg:flex-col lg:items-end justify-center lg:justify-end flex-wrap space-x-1">
      {data.length > 0 &&
        data.map((kontak, indeks) => {
          return (
            <IkonLabel
              key={indeks}
              mode={kontak.mode}
              teks={kontak.teks}
              warnaIkon={kontak.warnaIkon}
              warnaTeks={kontak.warnaTeks}
            />
          );
        })}
    </div>
  );
};

export default Kontak;
