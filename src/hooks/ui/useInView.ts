'use client'

import { useEffect, useState, useRef } from 'react'

export default function useInView(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                setIsInView(entry.isIntersecting)
            },
            { threshold: 0.5, ...options }
        )

        observer.observe(ref.current)

        return () => {
            if (ref.current) observer.unobserve(ref.current)
        }
    }, [options])

    return { ref, isInView }
}
