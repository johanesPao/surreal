import '@/app/_css/globals.css'
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.min.css'

import Header from '@/komponen/tsx/Header'
import { 
  inter, 
  jetbrainsMono, 
  robotoMono, 
  inconsolata,
  wotfard
} from '@/app/_fonts/fonts'

type Metadata = {
  title: {
    default: string,
    template: string
  }
}

export const metadata: Metadata = {
  title: {
    default: `${process.env.NAMA_SITUS}`,
    template: `${process.env.NAMA_SITUS} | %s`
  }
}

const title = metadata.title.default.replace('%s', metadata.title.default).replace('%d', process.env.NAMA_SITUS ? process.env.NAMA_SITUS : 'Nama Situs')

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`
        ${inter.variable} 
        ${jetbrainsMono.variable} 
        ${robotoMono.variable} 
        ${inconsolata.variable}
        ${wotfard.variable}
      `}
    >
      <head>
        <title>
          {title}
        </title>
      </head>
      <body className="h-screen">
        <div className="flex flex-col h-full">
            <Header />
            <main className="relative flex flex-col grow bg-cobalt-dusty-blue-950">
                {children}
            </main>
        </div>
      </body>
    </html>
  )
}
