import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Play } from 'lucide-react'
import { MovieType } from '@/types/models/movie.model'

interface MovieCardSimpleProps {
    movie: MovieType
    className?: string
}

export default function MovieCardSimple({ movie, className }: MovieCardSimpleProps) {
    const isInTop10 = movie.rank > 0 && movie.rank <= 10
    return (
        <article
            className={cn(
                'relative group cursor-pointer bg-[#1a1a1a] overflow-hidden transition-transform shadow-md',
                'w-[140px] sm:w-[150px] md:w-[165px] lg:w-[250px]',
                className
            )}
        >
            <div className='relative w-full aspect-video'>
                <Image
                    src={movie.horizontal_poster}
                    alt={movie.title}
                    fill
                    className='object-cover transition-transform group-hover:scale-[1.02]'
                />
                <button
                    className={cn(
                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                        'bg-black/50 hover:bg-black/30 hover:cursor-pointer rounded-full p-4',
                        'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                        'flex items-center justify-center z-30',
                        'shadow-lg'
                    )}
                >
                    <Play className='lg:w-5.5 lg:h-5.5 sm:w-3 sm:h-3 md:w-4 md:h-4 w-2.5 h-2.5 text-white fill-white' />
                </button>

                {movie.isVip && (
                    <div
                        className='
                            absolute top-0 left-0 
                            bg-gradient-to-r from-[#FFD700] to-[#FFC107] 
                            text-black text-[11px] sm:text-xs font-extrabold 
                            px-2 py-[2px] sm:py-[3px] 
                            tracking-wider uppercase 
                            rounded-br-md
                            z-20
                        '
                    >
                        VIP
                    </div>
                )}

                {isInTop10 && (
                    <div
                        className='absolute z-10 right-0 top-0 
                        bg-red-600 text-white font-bold 
                        flex items-center flex-col justify-center 
                        [clip-path:polygon(0_0,100%_0,100%_100%,0_80%)] 
                        overflow-hidden
                        text-[10px] 
                        p-[2px] sm:p-[3px]  
                        pb-[5px] sm:pb-[6px]  '
                    >
                        <span>TOP</span>
                        <span>10</span>
                    </div>
                )}
            </div>

            <div className='p-2.5'>
                <h3 className='text-sm font-semibold truncate text-white mb-1 transition-colors cursor-pointer'>
                    {movie.title}
                </h3>

                <div className='flex flex-wrap gap-x-1.5 text-[11px] text-gray-300 mb-1.5'>
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.country}</span>
                    <span>•</span>
                    <span>{movie.quality}</span>
                </div>

                <p className='text-xs text-gray-400 line-clamp-2 leading-snug'>{movie.description}</p>
            </div>
        </article>
    )
}
