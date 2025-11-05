import { isNewMovieRelease } from '@/helper/movie'
import { cn } from '@/lib/utils'
import { MovieType } from '@/types/models/movie.model'
import { useTranslations } from 'next-intl'

interface RankedMovieCardProps {
    movie: MovieType
    className?: string
}

export default function RankedMovieCard({ movie, className }: RankedMovieCardProps) {
    const isRecentlyAdded = isNewMovieRelease(movie.release_date)
    const t = useTranslations('FilmsPage.tagForMovie')

    return (
        <article
            className={cn(
                'relative  cursor-pointer  transition-transform duration-300 flex items-center justify-end',
                className
            )}
            style={{
                height: 'clamp(4rem, 15vw, 12rem)',
                width: 'calc( (clamp(4rem, 15vw, 12rem) * 9) / 13 *2)'
            }}
        >
            <div
                className='
                    
                    flex items-center justify-center
                    font-black leading-none select-none
                    text-transparent
                    relative
                    left-1/2 top-1/2 -translate-y-1/2 -translate-x-[calc(100%-8px)]
                    before:content-[attr(data-content)] before:absolute before:inset-0
                    before:[-webkit-text-fill-color:transparent] before:[-webkit-text-stroke:4px_rgba(255,255,255,0.3)]
                    before:z-[-1] z-0
                    
                '
                style={{
                    fontSize: 'clamp(4rem, 15vw, 12rem)',
                    lineHeight: 1,
                    scale: '1.4'
                }}
                data-content={movie.rank}
            >
                {movie.rank}
            </div>

            <div
                className='
                    h-full
                    z-1
                    flex-shrink-0 
                    aspect-[9/13] 
                    bg-cover bg-center 
                    overflow-hidden
                    relative
                    rounded-r-xs
                '
                style={{ backgroundImage: `url(${movie.vertical_poster})` }}
            >
                {isRecentlyAdded && (
                    <div
                        className='absolute bottom-0 left-1/2 -translate-x-1/2 
                            whitespace-nowrap w-max 
                            bg-red-600 text-white 
                            text-[5px] sm:text-[9px]  
                            px-1 sm:px-2
                            hidden md:block
                            py-[1px] sm:py-[2px]
                            rounded-t-xs font-medium backdrop-blur-sm'
                    >
                        {t('recentlyAdded')}
                    </div>
                )}
            </div>
        </article>
    )
}
