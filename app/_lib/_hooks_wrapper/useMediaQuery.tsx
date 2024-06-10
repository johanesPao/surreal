'use client'

import { useState, useEffect } from 'react'

export default function useMediaQuery(mediaQueryString: string) {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(mediaQueryString).matches
        }
        return false
    })

    useEffect(() => {
        if (typeof window !== 'undefined') return
        
        const mediaQueryList = (window as any).matchMedia(mediaQueryString)
        const listener = () => setMatches(!!mediaQueryList.matches)
        listener()
        mediaQueryList.addEventListener('change', listener)
        return () => mediaQueryList.removeEventListener('change', listener)
        
    }, [mediaQueryString])

    return matches
}