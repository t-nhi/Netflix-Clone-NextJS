'use client'

import Image from 'next/image'
import { FilmDetailType } from '@/types/film.type'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface MovieCardProps {
    movie: FilmDetailType
    className?: string
    isEditing: boolean
    isSelected: boolean
    disableHover?: boolean
    onSelect: () => void
}

export default function FavoriteCard({
    movie,
    className,
    isEditing,
    isSelected,
    disableHover,
    onSelect
}: MovieCardProps) {
    const [mounted, setMounted] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setMounted(true)
        if (movie.duration_minutes > 0) {
            setProgress(Math.min((movie.watch_duration_minutes / movie.duration_minutes) * 100, 100))
        }
    }, [movie.watch_duration_minutes, movie.duration_minutes])

    return (
        <article
            onClick={(e) => {
                if (!isEditing) return
                const target = e.target as HTMLElement
                if (!target.closest('input[type="checkbox"]') && !target.closest('button')) {
                    onSelect()
                }
            }}
            className={cn(
                'group relative w-full aspect-[16/9] rounded-[6px] overflow-hidden transition-all duration-300',
                'cursor-pointer',
                !isEditing && !disableHover && 'hover:shadow-lg',
                isEditing && 'opacity-90',
                isEditing && disableHover && 'pointer-events-none',
                className
            )}
            data-editing={isEditing}
        >
            {isEditing && (
                <input
                    type='checkbox'
                    checked={isSelected}
                    onChange={onSelect}
                    className='absolute top-2 right-2 z-30 accent-brand cursor-pointer bg-black checked:bg-gray-400 dark:checked:bg-gray-600 w-4 h-4'
                />
            )}

            <Image
                src={movie.horizontal_poster}
                alt={movie.title}
                fill
                className={cn(
                    'object-cover transition-all duration-300',
                    !isEditing && 'group-hover:scale-105',
                    isEditing && 'brightness-50'
                )}
            />

            <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent flex items-start'>
                <div className='px-2 py-1 w-full text-white'>
                    <h3 className='text-sm font-normal truncate'>{movie.title}</h3>
                </div>
            </div>

            {mounted && movie.duration_minutes > 0 && progress > 0 && (
                <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-gray-600/60'>
                    <div
                        className='h-full bg-red-500 transition-all duration-300'
                        style={{ width: `${progress.toFixed(0)}%` }}
                    />
                </div>
            )}
        </article>
    )
}
