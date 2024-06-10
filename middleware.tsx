import { NextRequest, NextResponse } from 'next/server'

const daftarOrigin = ['http://localhost', `http://${process.env.NAMA_DOMAIN}`]

const opsiCors = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

export function middleware(rekues: NextRequest) {
    // Cek origin rekues
    const origin = rekues.headers.get('origin') ?? ''
    const isOriginOk = daftarOrigin.includes(origin)

    // Tangani rekues preflight OPTIONS
    const isRekuesPreflight = rekues.method === 'OPTIONS'

    if (isRekuesPreflight) {
        const headerPreflight = {
            ...(isOriginOk && { 'Access-Control-Allow-Origin': origin }),
            ...opsiCors
        }
        return NextResponse.json({}, { headers: headerPreflight})
    }

    // Tangani rekues simple
    const respon = NextResponse.next()

    if (isOriginOk) {
        respon.headers.set('Access-Control-Allow-Origin', origin)
    }

    Object.entries(opsiCors).forEach(([kunci, nilai]) => {
        respon.headers.set(kunci, nilai)
    })

    return respon
}

export const config = {
    matcher: '/api/:path'
}