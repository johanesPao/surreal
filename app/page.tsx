import { Tulisan } from "@prisma/client"
import DaftarTulisan from "./_komponen/DaftarTulisan"
import { klien_redis } from "./_lib/_cache/redis"
import { getDaftarTulisanDiterbitkan, getSemuaPengguna, postPengguna } from "./_lib/_db/postgresql"

const Page = async () => {
  return <DaftarTulisan/>
}

export default Page