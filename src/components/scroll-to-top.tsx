'use client'

import { ArrowUpFromLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollPosition } from '@/hooks/ui/useScrollPosition'

export default function ScrollToTopButton() {
    const scrollY = useScrollPosition()
    const visible = scrollY > 400

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!visible) return null

    return (
        <Button
            size='icon'
            onClick={scrollToTop}
            className='
                fixed bottom-6 right-6 z-50 rounded-full
                hover:bg-[#2a2a2a] bg-black/10 text-white border border-white
                shadow-lg hover:scale-110 transition-all duration-300
                opacity-90 hover:opacity-100 cursor-pointer
            '
            aria-label='Scroll to top'
        >
            <ArrowUpFromLine className='w-3 h-3 md:w-4 md:h-4' />
        </Button>
    )
}
