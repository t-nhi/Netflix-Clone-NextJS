'use client'

import Header from '@/components/header'
import { useScrollPosition } from '@/hooks/ui/useScrollPosition'
import { cn } from '@/lib/utils'

interface HeaderFixedProps {
    className?: string
    buttonClassName?: string
}

export default function HeaderFixed({ className, buttonClassName }: HeaderFixedProps) {
    const scrollY = useScrollPosition()
    return (
        <Header
            className={cn(
                'fixed w-full top-0 z-10 bg-transparent  px-6 md:px-8 lg:px-14 transition-all duration-300',
                {
                    'bg-black/85 ': scrollY > 0
                },
                className
            )}
            buttonClassName={cn('text-white bg-transparent hover:bg-transparent hover:text-white', buttonClassName)}
            menuItemClassName={buttonClassName}
        />
    )
}
