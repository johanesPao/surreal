export { klien_redis }

import { createClient } from 'redis'

async function klien_redis() {
    const {user, pass, host, port} = {
        user: process.env.REDIS_USER,
        pass: process.env.REDIS_PASS,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
    try {
        const klien_baru = createClient({
            url: `redis://${user}:${encodeURIComponent(pass ? pass : '')}@${host}:${port}`
        })
        const klien = await klien_baru.connect()
        return klien
    } catch (kesalahan) {
        console.log(kesalahan)
    }
}