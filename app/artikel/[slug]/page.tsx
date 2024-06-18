import fs from "fs"
import path from "path"
import dynamic from 'next/dynamic'
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { opsiStringDate } from "@/app/_interface-props/_format.props"
import { getArtikel } from "@/app/_lib/_artikel/artikel"

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const artikel = await getArtikel(params)
    return {
        title: artikel.metadata.judul,
        description: artikel.metadata.judul
    }
}

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join("(artikel)"))
    const parameter = files.map(namaFile => ({
        slug: namaFile.replace(".mdx", "")
    }))

    return parameter
}

export default async function Page({ params }: { params: { slug: string}}) {
    const { slug } = params

    const artikel = await getArtikel(params)
    // import file MDX secara dinamis berdasar slug
    const MDXContent = dynamic(() => import(`@/(artikel)/${slug}.mdx`))

    return (
        <div className="">
            <article className="prose prose-lg md:prose-lg lg:prose-lg mx-auto">
                <div className="pb-4">
                    <div className="sticky top-0 bg-special-background py-2 flex flex-col gap-1">
                        <Link href="/">{`< Home`}</Link>
                        <h1 className="text-[24px] font-black">
                            {artikel.metadata.judul}
                        </h1>
                        <p>
                            {new Date(artikel.metadata.dipublikasikan).toLocaleDateString("en-ID", opsiStringDate)}
                        </p>
                        <hr />
                    </div>
                    <MDXContent />
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet laoreet metus. Fusce id pulvinar nulla, nec ornare velit. Etiam rhoncus, magna et accumsan viverra, mauris massa faucibus purus, a suscipit nibh nisi non risus. Cras at varius massa. Ut quis mi ut mi auctor molestie eget a mi. Aenean ultricies iaculis justo. Sed tincidunt mollis lectus, eu aliquam nunc. In eget gravida purus, vitae accumsan lectus. Quisque interdum pretium semper. In quis fringilla mi. Nam sit amet maximus turpis. In tempus, massa lacinia sagittis bibendum, odio eros ultrices massa, eu sollicitudin tortor mauris ut ex. Quisque dignissim sollicitudin risus. </div>
                </div>
            </article>
        </div>
    )
}