import '@/app/_ui/globals.css'

import Header from './_komponen/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: '',
    template: `%s | ${process.env.NAMA_DOMAIN}`
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <title>

        </title>
      </head>
      <body>
        <div className="flex lg:flex-row flex-col bg-primer w-screen h-screen py-0 px-0">
            <div className="sticky lg:fixed top-0 left-0">
                <Header />
            </div>
            <div className="px-5 py-5 fixed top-[200px] lg:top-0 lg:left-[350px] h-[calc(100vh-200px)] lg:h-full w-full lg:w-[calc(100vw-350px)]">
                {children}
            </div>
        </div>
      </body>
    </html>
  )
}
