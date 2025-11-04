'use client'

import * as React from 'react'
import { Play, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FilmDetailType } from '@/types/film.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface MovieCardProps {
    movie: FilmDetailType
    className?: string
}

export default function MovieCard({ movie, className }: MovieCardProps) {
    return (
        <article
            className={cn(
                'group relative bg-[#2F2F2F] rounded-xs overflow-hidden cursor-pointer transition-all duration-300',
                'flex flex-row @2xl:flex-col w-full',
                className
            )}
        >
            <div className='relative aspect-video @2xl:aspect-video w-1/3 @2xl:w-full overflow-hidden cursor-pointer'>
                <Image
                    src={movie.horizontal_poster}
                    alt={movie.title}
                    fill
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                />

                <div className='absolute top-2 right-2'>
                    <div className='bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm'>
                        {Math.floor(movie.duration_minutes / 60)}h {movie.duration_minutes % 60}m
                    </div>
                </div>

                <div
                    className={cn(
                        'absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100'
                    )}
                >
                    <Button
                        size='lg'
                        className='bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm rounded-full w-16 h-16 p-0'
                    >
                        <Play className='w-6 h-6 fill-current' />
                    </Button>
                </div>
            </div>

            <div className='p-4 flex-1 flex flex-col'>
                <div className='flex items-center gap-2 mb-3'>
                    <Badge variant='outline' className='bg-red-600 text-white border-gray-600 text-xs px-2 py-0.5'>
                        T{movie.age}
                    </Badge>
                    <Badge variant='outline' className=' text-white border-gray-600 text-xs px-2 py-0.5 bg-transparent'>
                        {movie.quality}
                    </Badge>
                    <span className='text-gray-400 text-sm'>{movie.year}</span>

                    <div className='ml-auto'>
                        <Button
                            size='sm'
                            variant='ghost'
                            className='text-white cursor-pointer hover:bg-gray-700 rounded-full border border-white hover:text-white w-8 h-8 p-0'
                        >
                            <Plus className='w-4 h-4' />
                        </Button>
                    </div>
                </div>

                <h3 className='text-white font-bold text-lg leading-tight mb-2'>{movie.title.toUpperCase()}</h3>
                <p className='text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4'>{movie.description}</p>

                <div className='mt-auto pt-3 border-t border-gray-700'>
                    <div className='flex flex-wrap gap-1'>
                        {movie.genres.slice(0, 3).map((genre, index) => (
                            <React.Fragment key={genre}>
                                <span className='text-gray-400 text-xs'>{genre}</span>
                                {index < Math.min(movie.genres.length, 3) - 1 && (
                                    <span className='text-gray-400 text-xs'>•</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    )
}
