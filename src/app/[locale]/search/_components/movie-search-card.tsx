'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { MovieSummaryType } from '@/types/dtos/movie/movie.dto'

interface MovieCardProps {
    movie: MovieSummaryType
    className?: string
}

export default function SearchCard({ movie, className }: MovieCardProps) {
    // const [mounted, setMounted] = useState(false)
    // const [progress, setProgress] = useState(0)

    // useEffect(() => {
    //     setMounted(true)
    //     if (movie.duration_minutes > 0) {
    //         setProgress(Math.min((movie.watch_duration_minutes / movie.duration_minutes) * 100, 100))
    //     }
    // }, [movie.watch_duration_minutes, movie.duration_minutes])

    return (
        <article
            className={cn(
                'group relative w-full aspect-video rounded-[6px] overflow-hidden',
                'cursor-pointer bg-neutral-900',
                'hover:shadow-lg',
                className
            )}
            title={movie.title}
        >
            <Image
                src={movie.horizontal_poster}
                alt={movie.title}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
            />

            <div className='absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <div className='rounded-full bg-white/20 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100'>
                    <Play className='h-6 w-6 fill-white text-white pl-0.5' />
                </div>
            </div>

            {/* {mounted && progress > 0 && (
                <div className='absolute bottom-0 left-0 right-0 z-10 h-1 bg-gray-600/40'>
                    <div className='h-full bg-red-600' style={{ width: `${progress.toFixed(0)}%` }} />
                </div>
            )} */}
        </article>
    )
}
