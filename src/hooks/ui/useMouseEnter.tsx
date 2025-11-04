import { useEffect, useRef, useState } from 'react'

export function useMouseEnter<T extends HTMLElement>(delay: number = 0) {
    const [hovered, setHovered] = useState(false)
    const ref = useRef<T | HTMLDivElement | null>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const handleMouseEnter = () => {
            if (delay > 0) {
                timerRef.current = setTimeout(() => setHovered(true), delay)
            } else {
                setHovered(true)
            }
        }

        const handleMouseLeave = () => {
            if (timerRef.current) clearTimeout(timerRef.current)
            setHovered(false)
        }

        node.addEventListener('mouseenter', handleMouseEnter)
        node.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
            node.removeEventListener('mouseenter', handleMouseEnter)
            node.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [delay])

    return { ref, hovered }
}
