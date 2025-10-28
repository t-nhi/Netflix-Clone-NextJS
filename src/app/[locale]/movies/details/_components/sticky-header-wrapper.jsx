'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'

export default function StickyHeaderWrapper({ buttonClassName }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const scrollThreshold = 100

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY

            if (currentScrollPos < scrollThreshold) {
                setIsHeaderVisible(false)
            } else if (currentScrollPos > prevScrollPos || currentScrollPos >= scrollThreshold) {
                setIsHeaderVisible(true)
            }

            setPrevScrollPos(currentScrollPos)
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollPos])

    return (
        <Header
            className={`transition-transform bg-[#111111FC] border-b-[0.3px] border-white/10 duration-300 fixed top-0 left-0 w-full z-50 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
            buttonClassName={buttonClassName}
        />
    )
}
