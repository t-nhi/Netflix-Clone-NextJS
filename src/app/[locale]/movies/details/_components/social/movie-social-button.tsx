'use client'

import CommentIcon from '@/components/icons/comment'
import ShareIcon from '@/components/icons/share'
import HeartIcon from '@/components/icons/heart'
import { useState } from 'react'
import { toast } from 'sonner'
import { FilmDetailType } from '@/types/film.type'
import { useTranslations } from 'next-intl'
import { ShareMenuDialog } from '@/components/ui/share-menu-dialog'
import { formatNumber } from '@/utils/formatting/formatNumber'

type Props = {
    informationFilm: FilmDetailType
}

export default function MovieSocialButton({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')
    const [isFavorite, setIsFavorite] = useState(false)

    const handleClickFavorite = () => {
        setIsFavorite(!isFavorite)
        toast('Bạn đã ' + (isFavorite ? 'bỏ yêu thích' : 'yêu thích') + ' phim này.')
    }
    const handleClickComment = () => {
        const commentBlock = document.getElementById('comment-block')
        if (commentBlock) {
            commentBlock.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <>
            <div className='bg-gradient-to-b rounded-sm xs:rounded w-full py-2'>
                <div className='flex flex-nowrap justify-start gap-x-8 xl:gap-x-10 sm:gap-x-12 md:gap-x-14'>
                    <div
                        className='flex flex-col items-center text-center cursor-pointer group'
                        onClick={handleClickFavorite}
                    >
                        <HeartIcon
                            className={`w-6 h-6 xs:w-7 xs:h-7 transition-all duration-200 ${
                                isFavorite
                                    ? 'fill-brand stroke-brand'
                                    : 'fill-transparent stroke-white group-hover:stroke-brand!'
                            }`}
                        />
                        {movie.like_count > 0 ? (
                            <strong className='mt-1 px-0.5 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand text-left'>
                                {formatNumber.format(movie.like_count)}
                            </strong>
                        ) : (
                            <span className='mt-1 px-0.5 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand text-left'>
                                0
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col items-center text-center cursor-pointer group'>
                        <CommentIcon
                            className='w-6 h-6 xs:w-7 xs:h-7 fill-white group-hover:fill-brand! transition-colors'
                            onClick={handleClickComment}
                        />
                        {movie.comments_count > 0 ? (
                            <strong className='mt-1 px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-left'>
                                {formatNumber.format(movie.comments_count)}
                            </strong>
                        ) : (
                            <span className='mt-1 px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-left'>
                                {t('rate')}
                            </span>
                        )}
                    </div>

                    <ShareMenuDialog
                        url={
                            typeof window !== 'undefined'
                                ? `${window.location.origin}${movie.film_url ?? ''}`
                                : (movie.film_url ?? '')
                        }
                    >
                        <div className='flex flex-col items-center text-center cursor-pointer group'>
                            <ShareIcon className='w-6 h-6 xs:w-7 xs:h-7 fill-white group-hover:fill-brand! transition-colors' />
                            {movie.share_count > 0 ? (
                                <strong className='mt-1 px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-left'>
                                    {formatNumber.format(movie.share_count)}
                                </strong>
                            ) : (
                                <span className='mt-1 px-1 xs:px-2 py-0.5 xs:py-1 text-xs group-hover:text-brand! text-left'>
                                    {t('share')}
                                </span>
                            )}
                        </div>
                    </ShareMenuDialog>
                </div>
            </div>
        </>
    )
}
