'use client'

import { motion, useScroll } from "framer-motion"
import TeksKetikan from "@/komponen/tsx/TeksKetikan"
import { IconBurger, IconTerminal, IconTerminal2 } from "@tabler/icons-react"

const Header = () => {
  const { scrollYProgress } = useScroll()
  return (
    <div className="h-auto py-[20px] px-[30px] bg-special-background w-full flex flex-col py-2 gap-1 justify-between sticky top-0">
      <div className="flex flex-row">
        <div className="grow">
          <motion.strong 
            className="font-wotfard text-[30px]"
            whileInView={{
              opacity: 1
            }}
          >
            {`Johanes Pao`}
          </motion.strong>
          <div className="flex flex-row gap-2">
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
        <div className="flex flex-col justify-around group cursor-pointer hover:animate-pulse">
          <div className="rounded-md">
            <IconTerminal className="" size={36}/>
          </div>
        </div>
      </div>
      <hr className="w-full" />
    </div>
  )
}

export default Header