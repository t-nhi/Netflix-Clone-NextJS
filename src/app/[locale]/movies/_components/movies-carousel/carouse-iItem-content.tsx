'use client'

import { Info } from 'lucide-react'
import { IoPlaySharp } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import useInView from '@/hooks/ui/useInView'
import { useAppSelector } from '@/store/hooks'
import MovieDetailDialog from '@/components/movie-detail-dialog'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { MovieType } from '@/types/models/movie.model'
import { HERO_VIEW_MODE, useMoviesPageContext } from '../../_context'
import ButtonMuted from './button-muted'
import SeeMore from '@/components/see-more'

interface CarouselItemContentProps {
    movie: MovieType
}

export default function CarouselItemContent({ movie }: CarouselItemContentProps) {
    const { heroViewMode, setHeroViewMode } = useMoviesPageContext()
    const { ref, isInView } = useInView()
    const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isOpenFilmDetail, setIsOpenFilmDetail] = useState<boolean>(false)
    const t = useTranslations('FilmsPage.heroSection')

    const isMuted = useAppSelector((state) => state.video.isMuted)

    const onOpenVideoDetail = () => {
        setIsOpenFilmDetail(true)
        setHeroViewMode(HERO_VIEW_MODE.slides)
    }

    const onCloseVideoDetail = () => {
        setIsOpenFilmDetail(false)
        setHeroViewMode(HERO_VIEW_MODE.videos)
    }

    useEffect(() => {
        if (isInView && heroViewMode === HERO_VIEW_MODE.videos) {
            timeoutRef.current = setTimeout(() => {
                setIsPlayVideo(true)
                videoRef.current?.play().catch(() => {})
            }, 1000)
        } else {
            setIsPlayVideo(false)
            if (videoRef.current) {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
            }
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [isInView, heroViewMode])

    return (
        <div
            className={cn('relative group  aspect-video w-full pt-[56.25%]', 'transition-all duration-500 ease-in-out')}
            ref={ref}
        >
            <Image
                src={movie.horizontal_poster}
                alt={movie.title}
                fill
                className={cn(
                    'w-full h-full object-cover transition-opacity duration-500 ease-in-out',
                    isPlayVideo ? 'opacity-0 ' : 'opacity-100'
                )}
            />
            <video
                className={cn(
                    'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out',
                    isPlayVideo ? 'opacity-100' : 'opacity-0'
                )}
                muted={isMuted}
                playsInline
                preload='metadata'
                autoPlay
                ref={videoRef}
                loop
            >
                <source src='https://trailer.vieon.vn/Teaser_HayDeToiToaSang.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <div className='absolute top-0 left-0 w-full h-full max-h-screen z-3'>
                <div className='absolute bottom-0 left-0 p-6 md:p-8 lg:p-12 w-full md:max-w-[50%] max-w-[85%]'>
                    <h2 className='text-white hidden md:block font-black text-xl md:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-3 lg:mb-4 leading-tight'>
                        {movie.title.toUpperCase()}
                    </h2>
                    <SeeMore
                        text={movie.description}
                        maxLines={3}
                        className='text-gray-200 hidden md:block text-sm md:text-base lg:text-lg  lg:mb-6 line-clamp-1 sm:line-clamp-3 leading-relaxed text-justify wrap-break-word'
                        classLabel='font-medium! text-gray-300!'
                        seeMoreText={t('seeMore')}
                        seeLessText={t('seeLess')}
                    />
                    <div className='flex items-center gap-3'>
                        <Button
                            className={cn(
                                'bg-white text-black hover:text-black hover:bg-gray-200 font-semibold rounded-xs flex items-center gap-1 sm:gap-2 cursor-pointer',
                                'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-10! md:py-3 md:text-base lg:px-10 lg:py-4 lg:h-12'
                            )}
                        >
                            <IoPlaySharp className='size-3 sm:size-4 md:size-5 lg:size-6 fill-current' />
                            {t('play')}
                        </Button>

                        <Button
                            variant='ghost'
                            onClick={onOpenVideoDetail}
                            className={cn(
                                'bg-gray-600/70 hover:bg-gray-600 text-white hover:text-white font-semibold rounded-xs flex items-center gap-1 sm:gap-2 cursor-pointer',
                                'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-3 md:text-base lg:px-10 lg:py-4 lg:h-12'
                            )}
                        >
                            <Info className='size-3 sm:size-4 md:size-5 lg:size-6' />
                            {t('moreInfo')}
                        </Button>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-[30%] right-0 z-3 flex items-center gap-3'>
                <ButtonMuted className='hidden md:flex ' />

                <div
                    className={cn(
                        'right-0 border-l-3 border-brand bg-black/50!',
                        'pr-5 md:pr-20 pl-2 h-5 md:h-8 bg-linear-to-r to-transparent  flex items-center '
                    )}
                >
                    <span className='text-white text-md md:text-base font-semibold '>T{movie.age}</span>
                </div>
            </div>
            <div
                className='absolute bottom-0 left-0 right-0 h-40
             bg-linear-to-t from-[#141414] via-[#141414]/60 via-40% to-transparent
             pointer-events-none z-1'
            />
            <div
                className='absolute top-0 left-0 right-0 h-24 md:h-28
             bg-linear-to-b from-[#141414] via-black/40 to-transparent
             z-1'
            />
            <MovieDetailDialog
                movie={movie}
                open={isOpenFilmDetail}
                onOpenChange={setIsOpenFilmDetail}
                onClose={onCloseVideoDetail}
            />
        </div>
    )
}
