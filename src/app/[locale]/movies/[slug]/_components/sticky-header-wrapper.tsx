'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import { useScrollPosition } from '@/hooks/ui/useScrollPosition'

interface StickyHeaderWrapperProps {
    buttonClassName?: string
}

const scrollThreshold = 100

export default function StickyHeaderWrapper({ buttonClassName }: StickyHeaderWrapperProps) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false)
    const scrollY = useScrollPosition()

    useEffect(() => {
        if (scrollY < scrollThreshold) {
            setIsHeaderVisible(false)
        } else {
            setIsHeaderVisible(true)
        }
    }, [scrollY])

    return (
        <Header
            className={`transition-transform bg-[#111111FC] border-b-[0.3px] border-white/10 duration-300 fixed top-0 left-0 w-full z-50 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
            buttonClassName={buttonClassName}
        />
    )
}
