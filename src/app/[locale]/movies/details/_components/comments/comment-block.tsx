import Image from 'next/image'
import { FilmDetailType } from '@/types/film.type'
import { useTranslations } from 'next-intl'
import { timeAgo } from '@/utils/formatting/formatTime'
import RatingForm from '@/app/[locale]/movies/details/_components/comments/rating-form'
import StarRating from '@/components/star-rating'
import { useLocale } from 'next-intl'
import SeeMore from '@/components/see-more'

type Props = {
    informationFilm: FilmDetailType
}

export default function CommentBlock({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')
    const locale = useLocale()

    return (
        <div className='mx-auto w-full px-6 md:px-8 lg:px-14'>
            <h2 className='text-base md:text-lg lg:text-xl font-semibold mb-3'>
                {t('rate')} ({movie.comments_count})
            </h2>
            <RatingForm />
            {movie.comments_count > 0 ? (
                <div className='flex flex-col gap-3 lg:w-[58%] w-full mt-2'>
                    {movie.comments?.map((comment, index) => (
                        <div key={index} className='pb-4'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='flex items-center gap-2'>
                                    <p className='font-medium text-[13px]'>{comment.user}</p>
                                    <StarRating
                                        rating={comment.rating}
                                        className='pointer-events-none'
                                        readOnly
                                        size={12}
                                    />
                                    <span className='text-xs text-gray-500'>
                                        {timeAgo({ locale, date: comment.rated_at })}
                                    </span>
                                </div>
                            </div>

                            <SeeMore
                                text={comment.content}
                                maxLines={2}
                                className='text-white! text-sm!'
                                classLabel='text-gray-300! font-medium!'
                                seeMoreText={t('seeMore')}
                                seeLessText={t('seeLess')}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-8 w-2/3 mx-auto'>
                    <Image
                        src='/images/detail-film/comment-blocked.png'
                        alt='No comments'
                        width={250}
                        height={250}
                        className='opacity-70 mb-4'
                    />
                    <p className='text-gray-400 text-sm text-center'>{t('noCommentsMessage')}</p>
                </div>
            )}
        </div>
    )
}
