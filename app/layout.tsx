import '@/app/_css/globals.css'

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
      <body>
        <div className="h-screen w-screen">
          <Header />
          <main className="relative z-10 bg-cobalt-blue px-[30px] py-[20px] flex">
            <div className="grid">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
