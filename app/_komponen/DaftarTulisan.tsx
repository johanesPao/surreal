'use client'

import { Tulisan } from "@prisma/client"
import { useEffect, useState } from "react"
import { getDaftarTulisanDiterbitkan } from "../_lib/_db/postgresql"
import { GET } from "../api/tulisan/route"
import { ResponDaftarTulisanDiterbitkan } from "../_interface-props/_hasil.props"
import TulisanCard from "./TulisanCard"

const DaftarTulisan = () => {
    const [memuat, setMemuat] = useState(false)
    const [daftarTulisan, setDaftarTulisan] = useState<ResponDaftarTulisanDiterbitkan[]>([])

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

    return (
        <>
            {memuat ? "Memuat..." : 
                    daftarTulisan.map(tulisan => {
                        return (
                            <TulisanCard
                                key={tulisan.idTulisan}
                                tulisan={tulisan}
                            />
                        )
                    })
            }
            {/* Blablabla... */}
        </>
    )
}

export default DaftarTulisan