'use client'

import { useEffect, useState } from "react"
import { ResponDaftarTulisanDiterbitkan } from "../_interface-props/_hasil.props"
import TulisanCard from "./TulisanCard"
import { Variants, motion } from "framer-motion"

const DaftarTulisan = () => {
    const [memuat, setMemuat] = useState(false)
    const [daftarTulisan, setDaftarTulisan] = useState<ResponDaftarTulisanDiterbitkan[] | null>(null)

    useEffect(() => {
        setMemuat(true)
        try {
            const fetchTulisan = async () => {
                const respon = await fetch('/api/tulisan')

                if (respon.ok) {
                    const data: ResponDaftarTulisanDiterbitkan[] = await respon.json()
                    console.log(data)
                    setDaftarTulisan(data)
                }
            }
            fetchTulisan()
        } catch (kesalahan) {
            console.log(kesalahan)
        }
        setMemuat(false)
    }, [])

    const motionKontainer: Variants = {
        takTerlihat: { 
            opacity: 0 
        },
        terlihat: { 
            opacity: 1, 
            transition: { 
                staggerChildren: 0.3,
                duration: 2
            }
        }
    }

    const motionTulisan: Variants = {
        takTerlihat: {
            opacity: 0,
            y: 100
        },
        terlihat: {
            opacity: 1,
            y: 0
        }
    }

    return (
        <>
            {memuat ? "Memuat..." : 
                daftarTulisan && 
                    <motion.div variants={motionKontainer} initial="takTerlihat" animate="terlihat">
                        {daftarTulisan.map(tulisan => {
                            return (
                                <motion.div 
                                    key={tulisan.idTulisan} 
                                    variants={motionTulisan}
                                    className="first:pb-6 last:pb-0"
                                >
                                    <TulisanCard
                                        key={tulisan.idTulisan}
                                        tulisan={tulisan}
                                    />
                                </motion.div>
                            )
                        })}
                    </motion.div>
            }
            {/* Blablabla... */}
        </>
    )
}

export default DaftarTulisan