'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FilmDetailType } from '@/types/film.type'
import { Play, Plus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTranslations } from 'next-intl'

interface WatchHistoryCardProps {
    movie: FilmDetailType
    className?: string
    isEditing: boolean
    isSelected: boolean
    disableHover?: boolean
    onSelect: () => void
}

export default function WatchHistoryCard({
    movie,
    className,
    isEditing,
    isSelected,
    disableHover,
    onSelect
}: WatchHistoryCardProps) {
    const t = useTranslations('HistoryPage')
    const progress = Math.min((movie.watch_duration_minutes / movie.duration_minutes) * 100, 100).toFixed(0)

    const isNew = React.useMemo(() => {
        if (!movie.release_date) return false
        const releaseDate = new Date(movie.release_date)
        const now = new Date()
        const diffDays = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24)
        return diffDays <= 30
    }, [movie.release_date])

    return (
        <article
            key={isEditing ? 'edit' : 'view'}
            onClick={(e) => {
                if (!isEditing) return
                if (!(e.target as HTMLElement).closest('input[type="checkbox"]')) {
                    onSelect()
                }
            }}
            className={cn(
                'group relative flex flex-col rounded-[4px] overflow-hidden border transition-all duration-300 ease-out w-[160px] sm:w-[200px] md:w-[220px] flex-shrink-0 select-none',
                'bg-white border-gray-200 dark:bg-[#1f1f1f] dark:border-transparent',
                'cursor-pointer',
                isEditing && 'opacity-90',
                isEditing && disableHover && 'pointer-events-none',
                className
            )}
        >
            <div className='relative w-full aspect-[16/9] overflow-hidden'>
                {isEditing && (
                    <input
                        type='checkbox'
                        checked={isSelected}
                        onChange={onSelect}
                        className='absolute top-2 right-2 z-50 accent-brand cursor-pointer dark:bg-black bg-white checked:bg-gray-400 dark:checked:bg-gray-600 w-4 h-4'
                    />
                )}
                <Image
                    src={movie.horizontal_poster}
                    alt={movie.title}
                    fill
                    className={cn(
                        'object-cover w-full h-full transition-transform duration-500',
                        !isEditing && 'group-hover:scale-105'
                    )}
                />

                <div
                    className='
                        absolute top-2 right-2 text-[10px] sm:text-xs px-2 py-0.5 rounded
                        bg-white/80 text-gray-900
                        dark:bg-black/80 dark:text-white
                    '
                >
                    {Math.floor(movie.duration_minutes / 60)}h {movie.duration_minutes % 60}m
                </div>

                <div className='absolute bottom-0 left-0 w-full h-[2px] bg-gray-300 dark:bg-[#808080]'>
                    <div
                        className='h-full bg-[#F50723] transition-all duration-300'
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className='flex flex-col justify-between flex-1 p-3'>
                <div className='flex items-center justify-between gap-2 mb-2 pb-2'>
                    <h3
                        className='font-semibold text-[14px] leading-tight truncate flex-1 text-gray-900 dark:text-white'
                        title={movie.title}
                    >
                        {movie.title}
                    </h3>

                    <div className='flex items-end gap-2'>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Button
                                        size='icon'
                                        variant='ghost'
                                        className='
                                            rounded-full p-0 flex-shrink-0 cursor-pointer
                                            w-6 h-6 lg:w-8 lg:h-8
                                            bg-gray-200 text-gray-800 hover:bg-gray-300
                                            dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100
                                        '
                                    >
                                        <Play className='w-3 h-3 md:w-4 md:h-4 fill-current stroke-none' />
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('tooltip.play')}</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Button
                                        size='icon'
                                        variant='ghost'
                                        className='
                                            rounded-full border w-6 h-6 lg:w-8 lg:h-8 p-0 cursor-pointer
                                            text-gray-700 border-gray-400 hover:bg-gray-200
                                            dark:text-white dark:border-white dark:hover:bg-gray-700
                                        '
                                    >
                                        <Plus className='w-3 h-3 md:w-4 md:h-4' />
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('tooltip.addToList')}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <div className='flex items-center gap-2 mb-2 relative pb-2'>
                    {isNew && (
                        <span className='text-green-600 dark:text-green-500 text-[10px] sm:text-xs py-0.5 font-bold inline-flex justify-start'>
                            New
                        </span>
                    )}

                    <Badge className='bg-red-500 text-white border-none text-[10px] px-2 py-0.5'>T{movie.age}</Badge>

                    <Badge
                        className='
                            bg-transparent border text-[10px] px-2 py-0.5
                            text-gray-800 border-gray-300
                            dark:text-white dark:border-gray-700
                        '
                    >
                        {movie.quality}
                    </Badge>

                    <span className='text-gray-500 dark:text-gray-400 text-xs'>{movie.year}</span>
                </div>

                <div className='flex flex-wrap items-center gap-1 mt-auto text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-400'>
                    {movie.genres.slice(0, 3).map((genre, index) => (
                        <React.Fragment key={genre}>
                            <span>{genre}</span>
                            {index < Math.min(movie.genres.length, 3) - 1 && <span>•</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </article>
    )
}
