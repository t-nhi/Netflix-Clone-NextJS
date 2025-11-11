'use client'

import { Play, Plus, ThumbsUp, X, Volume2, VolumeX } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DialogTitle } from '@radix-ui/react-dialog'
import StarRating from '@/components/star-rating'
import { formatNumber } from '@/utils/formatting/formatNumber'
import MovieCard from '@/components/movie-card'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleMute } from '@/store/features/video.slice'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { MovieType } from '@/types/models/movie.model'

interface MovieDetailDialogProps {
    movie: MovieType | null
    isLoading?: boolean
    open: boolean
    onOpenChange: (open: boolean) => void
    onClose?: () => void
}

export default function MovieDetailDialog({ movie, open, onOpenChange, onClose }: MovieDetailDialogProps) {
    const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false)
    const isMuted = useAppSelector((state) => state.video.isMuted)
    const appDispatch = useAppDispatch()
    const t = useTranslations('FilmsPage.filmDetail')

    const handleToggleMute = () => {
        appDispatch(toggleMute())
    }

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setIsPlayVideo(true)
            }, 1000)
        } else {
            setIsPlayVideo(false)
        }
    }, [open])

    const handleOpenChange = (open: boolean) => {
        onOpenChange(open)
        if (!open && onClose) {
            onClose()
        }
    }

    const handleOnClose = () => {
        onOpenChange(false)
        onClose?.()
    }

    if (!movie) return null

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className='max-w-4xl! p-0 bg-[#141414] border-0 rounded-none overflow-auto! max-h-[90vh]!'
                showCloseButton={false}
            >
                <DialogHeader className='hidden'>
                    <DialogTitle>{movie.title}</DialogTitle>
                </DialogHeader>
                <div className='relative h-[400px] md:h-[500px] overflow-hidden'>
                    <Image
                        src={movie.horizontal_poster}
                        alt={movie.title}
                        fill
                        className={cn('w-full h-full object-cover', {
                            'opacity-0': isPlayVideo,
                            'opacity-100': !isPlayVideo
                        })}
                    />
                    <video
                        muted={isMuted}
                        className={cn('w-full h-full object-cover', {
                            'opacity-100': isPlayVideo,
                            'opacity-0': !isPlayVideo
                        })}
                        autoPlay
                        loop
                        playsInline
                    >
                        <source src={movie.trailer_url} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>

                    <div className='absolute inset-0 bg-linear-to-t from-[#141414] via-[#141414]/20 to-transparent' />

                    <Button
                        variant='ghost'
                        size='sm'
                        className='absolute  cursor-pointer top-4 right-4 bg-[#141414]/80 hover:bg-[#141414]/60 text-white hover:text-white rounded-full w-10 h-10 p-0'
                        onClick={handleOnClose}
                    >
                        <X className='w-5 h-5' />
                    </Button>

                    <Button
                        variant='ghost'
                        size='sm'
                        className='absolute bottom-4 right-4 bg-[#141414]/80 hover:bg-[#141414]/60 text-white/50 hover:text-white rounded-full border border-white/50 w-10 h-10 p-0 curser-pointer z-10'
                        onClick={handleToggleMute}
                    >
                        {isMuted ? <VolumeX className='w-5 h-5' /> : <Volume2 className='w-5 h-5' />}
                    </Button>

                    <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8'>
                        <h1 className='text-white font-black text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight'>
                            {movie.title.toUpperCase()}
                        </h1>

                        <div className='flex items-center gap-3 mb-4'>
                            <Button
                                size='lg'
                                className='bg-white text-black hover:bg-gray-200 font-semibold px-10! py-3! rounded-xs flex items-center gap-2 cursor-pointer'
                            >
                                <Play className='w-5 h-5 fill-current' />
                                {t('play')}
                            </Button>

                            <Button
                                size='sm'
                                variant='ghost'
                                className='bg-zinc-600/70 hover:bg-zinc-600 text-white hover:text-white border border-gray-600 rounded-full w-10 h-10 p-0 cursor-pointer'
                            >
                                <Plus className='w-5 h-5' />
                            </Button>

                            <Button
                                size='sm'
                                variant='ghost'
                                className='bg-zinc-600/70 hover:bg-zinc-600 text-white hover:text-white border border-gray-600 rounded-full w-10 h-10 p-0 cursor-pointer '
                            >
                                <ThumbsUp className='w-5 h-5' />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='p-6 md:p-8 space-y-6'>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className='flex-1 space-y-4'>
                            <div className='flex items-center gap-3 text-sm'>
                                <span className='text-white'>{movie.year}</span>
                                <Badge variant='outline' className='text-white border-gray-500 text-xs '>
                                    {movie.quality}
                                </Badge>
                                <Badge className='bg-red-600  text-white  text-xs font-bold'>T{movie.age}</Badge>
                            </div>
                            <div className='flex items-center gap-3 text-white text-sm'>
                                <div>
                                    <span>
                                        {formatNumber.format(movie.views_count)} {t('views')}
                                    </span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <span>{movie.rating.toFixed(1)}</span>{' '}
                                    <StarRating rating={movie.rating} className='[&_svg]:size-4' />
                                </div>
                            </div>
                            <p className='text-white text-base leading-relaxed'>{movie.description}</p>
                        </div>

                        <div className='md:w-1/3 space-y-4 text-sm'>
                            <div>
                                <span className='text-gray-400'>{t('cast')} </span>
                                <span className='text-white'>
                                    {movie.actors.slice(0, 3).join(', ')}
                                    {movie.actors.length > 3 && ', more'}
                                </span>
                            </div>

                            <div>
                                <span className='text-gray-400'>{t('genres')} </span>
                                <span className='text-white'>{movie.genres.join(', ')}</span>
                            </div>

                            <div>
                                <span className='text-gray-400'>{t('thisShowIs')} </span>
                                <span className='text-white'>{movie.category}, Suspenseful, Exiting</span>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <h2 className='text-white text-xl font-semibold'>{t('moreLikeThis')}</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 @container'>
                            {Array.from({ length: 6 }, (_, i) => (
                                <MovieCard key={i} movie={movie} />
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
