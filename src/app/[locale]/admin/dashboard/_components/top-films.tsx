'use client'

import { useRouter } from '@/i18n/navigation'
import { formatNumber } from '@/utils/formatting/formatNumber'
import Image from 'next/image'
import { BsFillImageFill } from 'react-icons/bs'
import { FaChevronRight } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'
import { MovieType } from '@/types/models/movie.model'
import { getMockFilmsWithRank } from '@/_mock'
import StarRating from '@/components/star-rating'
import { TrendingUp } from 'lucide-react'

interface TopFilmsProps {
    classNames?: string
}

export default function TopFilms({ classNames }: TopFilmsProps) {
    const router = useRouter()
    const t = useTranslations('AdminPage.dashboardPage.topFilms')

    const films: MovieType[] = getMockFilmsWithRank(10)

    const handleTopFilmClick = () => {
        router.push(`/admin/topcontents`)
    }

    return (
        <div className={classNames}>
            <div className='text-base font-bold flex justify-between items-center'>
                <span className='flex items-center gap-2 cursor-pointer' onClick={handleTopFilmClick}>
                    {t('title')} <FaChevronRight />
                </span>
            </div>
            <div className='bg-card border rounded-lg border-border mt-4'>
                <ul className='divide-y'>
                    {films.slice(0, 10).map((film, index) => (
                        <li key={film.id}>
                            <VideoItem film={film} rank={index + 1} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

interface VideoItemProps {
    film: MovieType
    rank: number
}

function VideoItem({ film, rank }: VideoItemProps) {
    const formatRank = (rank: number) => {
        if (rank === 1) return '1st'
        if (rank === 2) return '2nd'
        if (rank === 3) return '3rd'
        return `${rank}th`
    }

    return (
        <div className='flex justify-between items-center cursor-pointer hover:bg-muted/50 p-4'>
            <div className='flex gap-4 items-center'>
                <div className='flex flex-col items-center w-8'>
                    <span className='text-sm font-bold'>{formatRank(rank)}</span>
                </div>

                {film.horizontal_poster ? (
                    <Image
                        src={film.horizontal_poster}
                        width={60}
                        height={80}
                        alt=''
                        className='object-cover w-[60px] h-20 rounded-md'
                    />
                ) : (
                    <div className='w-[60px] h-20 flex items-center justify-center bg-card rounded-md border'>
                        <BsFillImageFill />
                    </div>
                )}

                <div className='flex flex-col gap-1 flex-1'>
                    <span className='font-medium text-sm'>{film.title}</span>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <span className='bg-primary/10 text-primary px-2 py-0.5 rounded'>{film.category}</span>
                        <span className='bg-primary/10 text-primary px-2 py-0.5 rounded'>{film.year}</span>
                        <span className='bg-primary/10 text-primary px-2 py-0.5 rounded'>{film.age}</span>
                    </div>
                    <span className='text-xs'>{formatNumber.format(film.views_count)}</span>
                    <StarRating rating={film.rating} readOnly size={10} />
                </div>
            </div>
            <TrendingUp className='text-green-500' />
        </div>
    )
}
