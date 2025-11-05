import { useTranslations } from 'next-intl'
import VideoProgressIndicator from '@/app/[locale]/movies/details/_components/social/video-progress-indicator'
import MovieSocialButton from '@/app/[locale]/movies/details/_components/social/movie-social-button'
import StarRating from '@/components/star-rating'
import { formatNumber } from '@/utils/formatting/formatNumber'
import SeeMore from '@/components/see-more'
import { MovieType } from '@/types/models/movie.model'

type Props = {
    informationFilm: MovieType
}

export default function DetailFilm({ informationFilm }: Props) {
    const movie = informationFilm
    const t = useTranslations('InformationForm')

    if (!movie) return null

    return (
        <div className='mx-auto w-full px-6 md:px-8 lg:px-14'>
            <div className='flex flex-col lg:flex-row md:gap-6 lg:gap-26 xl:gap-38 gap-2 sm:gap-4'>
                <div className='flex-1 lg:flex-[0_0_58%] min-w-0'>
                    <h1 className='lg:text-base sm:text-2xl md:text-[18px] text-[26px] font-normal lg:mb-[16px] md:mb-[16px] sm:mb-[16px] mb-[12px] break-words'>
                        {movie.title}
                    </h1>
                    <h2 className='text-base lg:mb-[16px] md:mb-[16px] sm:mb-[16px] mb-[12px] break-words'>
                        {movie.title_other}
                    </h2>
                    <div className='flex flex-wrap items-center lg:mb-[16px] md:mb-[16px] sm:mb-[16px] mb-[12px] gap-2 xs:gap-3 sm:gap-4 xs:mb-4'>
                        <strong className='text-sm xs:text-base font-normal'>
                            {formatNumber.format(movie.views_count)}
                            <span className='ml-1'>{t('views')}</span>
                        </strong>
                        <div className='flex text-sm items-center gap-1 xs:gap-2  cursor-pointer'>
                            <span className='pl-2'>{movie.rating}</span>
                            <StarRating rating={movie.rating} readOnly size={15} />
                        </div>
                    </div>
                    <div className='flex flex-wrap font-medium items-center text-sm xs:text-base lg:mb-[16px] md:mb-[16px] sm:mb-[16px] mb-[12px] gap-3'>
                        <span>{movie.year}</span>
                        <span className='text-gray-400 font-light'>|</span>
                        <span>{movie.age}</span>
                        <span className='text-gray-400 font-light'>|</span>
                        <span>{movie.country}</span>
                        <span className='text-gray-400 font-light'>|</span>
                        <span>{movie.quality}</span>
                    </div>

                    <div className='flex items-center gap-2 xs:gap-3 sm:gap-4 lg:mb-[16px] md:mb-[16px] sm:mb-[16px] mb-[12px] xs:mb-4 flex-wrap'>
                        <VideoProgressIndicator />
                        <span className='ml-1 xs:ml-2 xs:text-base flex-shrink-0 text-xs'>
                            {t('still_has')} {movie.duration_minutes}
                        </span>
                    </div>
                    <div className='mb-3 xs:mb-4'>
                        <SeeMore
                            text={movie.description}
                            maxLines={5}
                            className='text-sm xs:text-base text-white leading-relaxed text-justify break-words'
                            classLabel='font-medium! text-gray-300!'
                            seeMoreText={t('seeMore')}
                            seeLessText={t('seeLess')}
                        />
                    </div>
                </div>

                <div
                    className='
                        w-full 
                        lg:w-2/9 
                        flex-shrink-0 
                        ml-0 
                        lg:ml-auto 
                        text-left
                    '
                >
                    <MovieSocialButton informationFilm={movie} />
                    <div className='text-sm gap-2'>
                        <div className='items-baseline py-1.5'>
                            <span className='text-[#b3b3b3] pr-0.5'>{t('actors')}:</span>
                            <span className='mt-1 font-medium break-words cursor-pointer'>
                                {movie.actors.join(', ')}
                            </span>
                        </div>
                        <div className='items-baseline gap-1 py-1.5'>
                            <span className='text-[#b3b3b3] pr-0.5'>{t('director')}:</span>
                            <span className='mt-1 font-medium break-words cursor-pointer'>
                                {movie.directors.join(', ')}
                            </span>
                        </div>
                        <div className='items-baseline gap-1 py-1.5'>
                            <span className='text-[#b3b3b3] pr-0.5'>{t('genre')}:</span>
                            <span className='mt-1 font-medium break-words cursor-pointer'>
                                {movie.genres.join(', ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
