'use client'

import TeksKetikan from "./TeksKetikan";
import { HeaderProps } from "@/app/_interface-props/Header.props";
import TimerUmur from "./TimerUmur";
import Kontak from "./Kontak";
import NavigasiLanding from '@/app/_komponen/NavigasiLanding'
import { motion, useAnimate, stagger, Variants }from 'framer-motion'
import { useState, useEffect } from 'react'
import useMediaQuery from "../_lib/_hooks_wrapper/useMediaQuery";

const Header = () => {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const [diDesktop, setDiDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    setDiDesktop(desktop)
  }, [desktop])

  const defaultHeaderProps: HeaderProps = {
    nama: {
      teks: "Johanes Gregorius Indra Pradana Pao",
    },
    jabatan: {
        teks: [
            "A Loving Husband and Father",
            "Data Enthusiast",
            "Data Visualization",
            "Data Transformation",
            "Data Training",
            "Data Modeling",
        ],
        kursor: "|",
        jedaAntarArray: 1000,
        loop: true,
    },
    infoDeskripsi: {
        teks: `Experienced Senior Business Analyst with a demonstrated history of working in the retail 
    industry. Very skillfull with data preparation, query, transformation and visualization. With ever expanding
    language such as Python, Mojo, R, Typescript and Rust. Also very much in love with Machine Learning
    and Neural Network modeling`,
        kecepatanTulis: 20,
    },
    tahun: 1985,
    bulan: 3,
    hari: 3,
    dataKontak: [
        {
            mode: "TELP",
            teks: "(+62) 811 118 3385",
            warnaIkon: "#2dba4e",
        },
        {
            mode: "GMAIL",
            teks: "johanes.pao",
            warnaIkon: "#c71610",
        },
        {
            mode: "GITHUB",
            teks: "johanesPao",
            warnaIkon: "#ffd166",
        },
        {
            mode: "DOCKER",
            teks: "j0hanespao",
            warnaIkon: "#0db7ed",
        },
        {
            mode: "X",
            teks: "@teh_kotak_lemon",
            warnaIkon: "#6c757d",
        },
    ]
  };

  const {nama, jabatan, infoDeskripsi, tahun, bulan, hari, dataKontak} = defaultHeaderProps

  console.log(diDesktop)

  const varian: Variants = {
    headAwal: diDesktop ? { 
      x: -80, 
      opacity: 0
    } : {
      y: -80, 
      opacity: 0
    },
    headAkhir: diDesktop ? { 
      x: 0, 
      opacity: 1, 
    } : { 
      y: 0, 
      opacity: 1
    }
  }

  if (diDesktop === null) {
    return null
  }

  return (
    <div className="flex flex-col lg:w-[350px] lg:h-screen bg-stone-900 px-10 lg:pr-3 py-5 text-center lg:text-right items-center lg:items-end lg:gap-1 lg:justify-between">
        <motion.div 
          className="flex flex-col lg:h-1/3"
          variants={varian}
          initial="headAwal"
          animate="headAkhir"
          transition={{ 
            delay: diDesktop ? 0 : 1,
            duration: 0.7
          }}
        >
          <div className="text-md font-semibold">
            {nama.teks}
          </div>
          <div>
            <TimerUmur tahun={tahun} bulan={bulan} hari={hari} />
          </div>
          <div className="text-xs font-mono">
            {infoDeskripsi.teks}
          </div>
          <div className="text-sm font-mono font-extrabold">
            <TeksKetikan {...jabatan} />
          </div>
        </motion.div>
        <motion.div 
          className="lg:h-1/3 lg:flex lg:flex-col lg:justify-center"
          variants={varian}
          initial="headAwal"
          animate="headAkhir"
          transition={{ 
            delay: 0.5,
            duration: 0.7
          }}
        >
            <NavigasiLanding />
        </motion.div>
        <motion.div 
          className="lg:flex lg:flex-row"
          variants={varian}
          initial="headAwal"
          animate="headAkhir"
          transition={{ 
            delay: diDesktop ? 1 : 0,
            duration: 0.7 
          }}
        >
          <Kontak data={dataKontak} />
        </motion.div>
    </div>
  );
};

export default Header;