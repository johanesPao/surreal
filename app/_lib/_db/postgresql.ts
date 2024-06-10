export { getSemuaPengguna, postPengguna }

import { PrismaClient } from '@prisma/client'
import { cache } from 'react'

let prisma: PrismaClient | undefined

function bukaKoneksi() {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    return prisma
}

async function tutupKoneksi() {
    if (prisma) {
        await prisma.$disconnect();
    }
    prisma = undefined
}

async function denganPrisma<T>(callback: (prisma: PrismaClient) => Promise<T>) {
    const klien = bukaKoneksi()
    try {
        return await callback(klien)
    } finally {
        await tutupKoneksi();
    }
}

async function getSemuaPengguna() {
    return await denganPrisma((prisma) => prisma.pengguna.findMany())
}

async function postPengguna() {
    return await denganPrisma((prisma) => 
        prisma.pengguna.create({
            data: {
                namaPengguna: 'jpao',
                kataKunci: '@Kmb583030',
                email: 'johanes.pao@gmail.com',
                admin: true,
                penulis: {
                    create: {
                        namaPena: 'Johanes Indra Pradana Pao'
                    }
                }
            }
        })
    )
}

// function bukaKoneksi() {
//     return new PrismaClient()
// }

// async function tutupKoneksi(prisma: PrismaClient) {
//     return await prisma.$disconnect()
// }

// async function getSemuaPengguna() {
//     const prisma = bukaKoneksi()
//     const semuaPengguna = await prisma.pengguna.findMany()
//     console.log(semuaPengguna)
// }

// async function postPengguna() {
//     const prisma = bukaKoneksi()
//     const penggunaTerbuat = await prisma.pengguna.create({
//         data: {
//             namaPengguna: 'jpao',
//             kataKunci: '@kmb583030',
//             email: 'johanes.pao@gmail.com',
//             admin: true,
//             penulis: {
//                 create: {
//                     namaPena: 'Johanes Indra Pradana Pao'
//                 }
//             }
//         }
//     })
// }