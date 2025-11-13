import { useLayoutEffect, useState } from 'react'

export interface WindowSize {
    width: number
    height: number
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>(() => {
        if (typeof window !== 'undefined') return { width: window.innerWidth, height: window.innerHeight }
        return { width: 0, height: 0 }
    })

    useLayoutEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    })

    return windowSize
}
