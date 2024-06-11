import { Kategori, Tulisan } from "@prisma/client";

export interface ResponDaftarTulisanDiterbitkan extends Tulisan {
    kategori: Kategori[]
}