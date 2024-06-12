import { opsiStringDate } from "@/app/_interface-props/_format.props";
import { ResponDaftarTulisanDiterbitkan } from "../_interface-props/_hasil.props";
import KategoriCard from "./KategoriCard";

const TulisanCard = ({ tulisan }: { tulisan: ResponDaftarTulisanDiterbitkan }) => {
    return (
        <>
            <div className="flex flex-col py-0 px-6 lg:px-1 gap-1">
                <div>
                    <a 
                        className="cursor-pointer text-2xl font-sans font-semibold subpixel-antialiased text-emerald-400 hover:text-emerald-300" 
                    >
                        {tulisan.judul}
                    </a>
                </div>
                <div className="text-stone-400 text-sm italic">
                    {new Date(tulisan.dibuat).toLocaleDateString('en-ID', opsiStringDate)}
                </div>
                <div>
                    {tulisan.kategori?.map((itemKategori, indeks) => (
                        <KategoriCard key={indeks} kategori={itemKategori} />
                    ))}
                </div>
                <div className="flex flex-col xl:text-base text-sm">
                    <article className="bg-gradient-to-b from-white via-white via-60% text-transparent bg-clip-text line-clamp-10">
                        {tulisan.konten}
                    </article>
                </div>
            </div>
        </>
    )
}

export default TulisanCard