import { getDaftarTulisanDiterbitkan } from "@/app/_lib/_db/postgresql";

export async function GET() {
    try {
        const respon = await getDaftarTulisanDiterbitkan()
        return Response.json(respon)
    } catch (kesalahan) {
        return Response.json(kesalahan)
    }
}