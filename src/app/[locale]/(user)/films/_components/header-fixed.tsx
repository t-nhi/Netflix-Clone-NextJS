'use client'

import Header from '@/components/header'
import { useScrollPosition } from '@/hooks/ui/useScrollPosition'
import { cn } from '@/lib/utils'

export default function HeaderFixed() {
    const scrollY = useScrollPosition()
    return (
        <Header
            className={cn('fixed w-full top-0 z-10 bg-transparent  px-6 md:px-8 lg:px-14 transition-all duration-300', {
                'bg-black/85 ': scrollY > 0
            })}
            buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white'
        />
    )
}
