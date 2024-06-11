import { opsiStringDate } from "@/app/_interface-props/_format.props";
import { ResponDaftarTulisanDiterbitkan } from "../_interface-props/_hasil.props";
import KategoriCard from "./KategoriCard";

const TulisanCard = ({ tulisan }: { tulisan: ResponDaftarTulisanDiterbitkan }) => {
    return (
        <>
            <div className="flex flex-col p-2 gap-1 first:pt-0 last:pb-0">
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
                {/* <div className="xl:text-base text-xs">
                    {data.konten ? (
                        <Markdown
                            options={{
                                wrapper: 'article',
                                forceWrapper: true,
                                overrides: {
                                    TestChart,
                                    KonversiLatex
                                }
                            }}
                        >
                            {data.konten}
                        </Markdown>
                    ): null}
                </div> */}
                <div className="flex flex-col xl:text-base text-sm break-words hyphens-auto line-clamp-6 text-justify">
                    {/* <Markdown 
                        remarkPlugins={[remarkGfm, remarkMath, remarkRehype]}
                        rehypePlugins={[rehypeKatex]}
                        className="line-clamp-6"
                    > */}
                    <p>
                        {tulisan.konten}
                    </p>
                    {/* </Markdown> */}
                </div>
            </div>
        </>
    )
}

export default TulisanCard