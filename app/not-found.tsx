'use client'

import { motion } from 'framer-motion'

const Custom404 = () => {
    return (
        <motion.div 
            className="flex flex-col h-full justify-center items-center text-md lg:text-xl w-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <p>Maaf, halaman tidak dapat ditemukan...</p>
        </motion.div>
    )
}

export default Custom404