'use client'
import Typewriter from "typewriter-effect";
import { TeksKetikanProps } from "@/app/_interface-props/TeksKetikan.props";
import { EKonstan } from "@/app/_enums/enums";

const TeksKetikan = ({
  teks,
  kecepatanTulis = EKonstan.JEDA_TEKS_KETIKAN,
  jedaAntarArray = EKonstan.JEDA_ARRAY_TEKS_KETIKAN,
  loop = false,
  jedaAntarLoop = EKonstan.JEDA_LOOP_TEKS_KETIKAN,
  kursor = "",
  kecepatanHapus = EKonstan.KECEPATAN_HAPUS_TEKS_KETIKAN,
  className = "",
}: TeksKetikanProps) => {
  return (
    <Typewriter
      onInit={(ketikan) => {
        ketikan.changeDelay(kecepatanTulis);
        ketikan.changeDeleteSpeed(kecepatanHapus);
        if (Array.isArray(teks)) {
          for (var [indeks, elemenTeks] of teks.entries()) {
            ketikan.typeString(elemenTeks);
            if (indeks !== teks.length - 1) {
              ketikan.pauseFor(jedaAntarArray);
              ketikan.deleteAll();
            } else {
              ketikan.pauseFor(jedaAntarLoop);
            }
            ketikan.start();
          }
        } else {
          ketikan.typeString(teks);
          ketikan.start();
        }
      }}
      options={{
        cursor: kursor,
        loop,
        wrapperClassName: className,
      }}
    />
  );
};

export default TeksKetikan;
