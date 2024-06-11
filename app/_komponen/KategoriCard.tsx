import { Kategori } from "@prisma/client";
import { IconStack2 } from "@tabler/icons-react";

const KategoriCard = ({ kategori } : { kategori: Kategori}) => {
    return (
        <div 
            className="flex flex-row gap-1 items-center italic text-sm group cursor-pointer"
        >
            <div>
                <IconStack2 color={`${kategori.warna}`}/>
            </div>
            <div className="text-zinc-300">
                    {kategori.nama}
            </div>
        </div>
    )
}

export default KategoriCard