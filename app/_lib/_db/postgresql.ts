export { getSemuaPengguna, postPengguna, getDaftarTulisanDiterbitkan }

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

async function getDaftarTulisanDiterbitkan() {
    return await denganPrisma((prisma) => prisma.tulisan.findMany({
        where: {
            diterbitkan: true
        },
        take: 10,
        orderBy: {
            dimodifikasi: 'desc'
        },
        include: {
            kategori: true
        }
    }))
}