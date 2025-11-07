'use client'

import { useCarousel } from '@/components/ui/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { HERO_VIEW_MODE, useMoviesPageContext } from '../../_context'

interface IndicatorProps {
    wrapperClassName?: string
    CarouselArrowsClassName?: string
    dotClassName?: string
    activeDotClassName?: string
    autoPlayInterval: number
}

export default function Indicator({
    CarouselArrowsClassName,
    activeDotClassName,
    dotClassName,
    wrapperClassName,
    autoPlayInterval
}: IndicatorProps) {
    const { currentIndex, slidesCount, scrollToIndex, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
        useCarousel()

    const { heroViewMode } = useMoviesPageContext()

    useEffect(() => {
        if (!autoPlayInterval || slidesCount <= 1) return
        if (heroViewMode != HERO_VIEW_MODE.slides) return
        const interval = setInterval(() => {
            if (canScrollNext) {
                scrollNext()
            } else scrollToIndex(0)
        }, autoPlayInterval)

        return () => clearInterval(interval)
    }, [heroViewMode, autoPlayInterval, slidesCount, scrollNext, canScrollNext, scrollToIndex])

    return (
        <div className={cn('flex items-center justify-center gap-3 mt-4', wrapperClassName)}>
            <div className='flex items-center gap-2'>
                {Array.from({ length: slidesCount }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={cn(
                            'h-2 rounded-full transition-all duration-300 cursor-pointer',
                            index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-gray-500/70 hover:bg-gray-400',
                            {
                                [dotClassName ?? '']: dotClassName,
                                [activeDotClassName ?? '']: index === currentIndex
                            }
                        )}
                    />
                ))}
            </div>

            <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border border-white/60 text-white/80 disabled:opacity-40 cursor-pointer',
                    CarouselArrowsClassName
                )}
            >
                <ChevronLeft size={16} />
            </button>

            <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border border-white/60 text-white/80 disabled:opacity-40 cursor-pointer',
                    CarouselArrowsClassName
                )}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    )
}
