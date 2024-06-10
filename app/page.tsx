import DaftarTulisan from "./_komponen/DaftarTulisan"
import { klien_redis } from "./_lib/_cache/redis"
import { getSemuaPengguna, postPengguna } from "./_lib/_db/postgresql"

const Page = async () => {
  // klien_redis()
  // postPengguna()
  // console.log(await getSemuaPengguna())
  
  return <DaftarTulisan/>
}

export default Page