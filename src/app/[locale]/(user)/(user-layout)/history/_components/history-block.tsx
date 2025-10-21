'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { FilmDetailType } from '@/types/film.type'
import { formatDayMonth } from '@/utils/formatting/formatTime'
import FilmCarousel from '@/components/film-carousel'
import { CarouselItem } from '@/components/ui/carousel'
import WatchHistoryCard from './movie-watched-card'
import { getMockFilms } from '@/_mock'

interface HistoryBlockProps {
    movies?: FilmDetailType[]
    isEditing: boolean
    selectedMovies: string[]
    onSelect: (id: string) => void
}

export default function HistoryBlock({ isEditing, selectedMovies, onSelect }: HistoryBlockProps) {
    const mockMovies = useMemo(() => getMockFilms(50), [])
    const t = useTranslations('HistoryPage')
    const locale = useLocale()
    const containerRef = useRef<HTMLDivElement>(null)
    const [groupedByDate, setGroupedByDate] = useState<Record<string, FilmDetailType[]>>({})

    const stableMovies = useMemo(() => mockMovies ?? [], [mockMovies])

    useEffect(() => {
        if (stableMovies.length === 0) {
            setGroupedByDate({})
            return
        }

        const grouped = stableMovies.reduce<Record<string, FilmDetailType[]>>((acc, movie) => {
            const dateKey = new Date(movie.watched_at).toISOString().split('T')[0]
            acc[dateKey] = acc[dateKey] ? [...acc[dateKey], movie] : [movie]
            return acc
        }, {})

        for (const key in grouped) {
            grouped[key].sort((a, b) => new Date(b.watched_at).getTime() - new Date(a.watched_at).getTime())
        }

        setGroupedByDate(grouped)
    }, [stableMovies])

    const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    const renderEmptyState = () => (
        <div className='flex flex-col items-center justify-center py-8 w-2/3 mx-auto'>
            <Image
                src='/images/history/empty-watched.png'
                alt='empty-watched'
                width={250}
                height={250}
                className='opacity-70 mb-4'
            />
            <p className='text-gray-400 text-sm text-center'>{t('noHistory')}</p>
        </div>
    )

    if (stableMovies.length === 0) return renderEmptyState()

    return (
        <div ref={containerRef} className='mx-auto w-full min-h-screen'>
            <div className='space-y-10'>
                {sortedDates.map((dateKey) => (
                    <div key={dateKey} className='mb-10'>
                        <h2 className='text-lg font-semibold mb-3 px-6 md:px-8 lg:px-14 '>
                            {formatDayMonth({ locale, date: dateKey })}
                        </h2>

                        <FilmCarousel>
                            {groupedByDate[dateKey].map((movie) => (
                                <CarouselItem key={movie.id} className='max-w-fit! p-0!'>
                                    <WatchHistoryCard
                                        key={movie.id}
                                        movie={movie}
                                        isEditing={isEditing}
                                        isSelected={selectedMovies.includes(movie.id)}
                                        onSelect={() => onSelect(movie.id)}
                                    />
                                </CarouselItem>
                            ))}
                        </FilmCarousel>
                    </div>
                ))}
            </div>
        </div>
    )
}
