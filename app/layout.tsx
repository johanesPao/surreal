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
        <div className="flex flex-col lg:flex-row bg-primer w-screen py-0 px-0 h-screen">
            <div className="sticky h-auto lg:fixed lg:top-0 lg:left-0">
                <Header />
            </div>
            <div className="lg:relative overflow-y-scroll px-5 py-5 lg:top-0 lg:left-[350px] lg:h-full w-full lg:w-[calc(100vw-350px)]">
                {children}
            </div>
        </div>
      </body>
    </html>
  )
}
