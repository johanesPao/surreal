'use client'

import { motion, useScroll } from "framer-motion"
import TeksKetikan from "@/komponen/tsx/TeksKetikan"
import { IconBurger, IconTerminal, IconTerminal2 } from "@tabler/icons-react"

const Header = () => {
  const { scrollYProgress } = useScroll()
  return (
    <header className="h-[100px] py-[20px] px-[30px] text-special-background flex items-center">
      <div className="fixed flex-row top-[20px] gap-2 items-baseline z-0">
        <motion.strong 
          className="font-wotfard text-[30px]"
          whileInView={{
            opacity: 1
          }}
        >
          {`Johanes Pao`}
        </motion.strong>
        <div className="flex gap-2">
          <span>A</span>
          <TeksKetikan
            teks={[
              "Loving Husband and Father",
              "Data Enthusiast",
              "Data Visualizer",
              "Data Transformer",
              "Data Trainer"            
            ]}
            loop
            kursor="_"
          />
        </div>
      </div>
      <div className="fixed flex top-[20px] right-[30px] h-[45px] items-center z-50">
        <div className="bg-cobalt-blue-900 rounded-md">
          <IconTerminal className="animate-pulse transition-all" size={36}/>
        </div>
      </div>
    </header>
  )
}

export default Header