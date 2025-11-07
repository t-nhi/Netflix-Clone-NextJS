'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FilmDetailType } from '@/types/film.type'
import { getMockFilms } from '@/_mock'
import { maskId } from '@/utils/formatting/formatId'

type FilmsListProps = {
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

const imageSrc = (url: string): string => {
    if (url?.startsWith('/public')) return url.replace('/public', '')
    return url
}

export default function FilmsList({ onEdit, onDelete }: FilmsListProps) {
    const t = useTranslations('AdminPage.filmsPage')
    const [films, setFilms] = useState<FilmDetailType[]>([])

    useEffect(() => {
        setFilms(getMockFilms(20))
    }, [])

    if (films.length === 0) {
        return <div className='text-center py-12 text-gray-500'>{t('emptyFilm')}</div>
    }

    return (
        <div className='rounded-lg shadow overflow-hidden w-full max-w-[1200px] mx-auto'>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm border-collapse min-w-[800px]'>
                    <thead>
                        <tr>
                            <th
                                colSpan={8}
                                className='px-4 py-4 text-lg font-semibold text-gray-800 dark:text-white border-b text-left'
                            >
                                {t('title')}
                            </th>
                        </tr>
                        <tr className='bg-gray-100 dark:bg-white/20 text-left text-gray-700 dark:text-gray-400'>
                            <th className='px-4 py-2 font-medium'>{t('id')}</th>
                            <th className='px-4 py-2 font-medium'>{t('poster')}</th>
                            <th className='px-4 py-2 font-medium'>{t('name')}</th>
                            <th className='px-4 py-2 font-medium'>{t('year')}</th>
                            <th className='px-4 py-2 font-medium'>{t('duration')}</th>
                            <th className='px-4 py-2 font-medium'>{t('rating')}</th>
                            <th className='px-4 py-2 font-medium text-center'>{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map((film) => {
                            const maskedId = maskId(film.id)
                            const imgSrc = imageSrc(film.vertical_poster || '/images/film/default.png')
                            const duration = `${Math.floor(film.duration_minutes / 60)}h ${film.duration_minutes % 60}m`

                            return (
                                <tr
                                    key={film.id}
                                    className='border-t hover:bg-gray-50 dark:hover:bg-white/10 transition-colors'
                                >
                                    <td className='px-4 py-2 text-gray-900 dark:text-white font-mono text-xs'>
                                        {maskedId}
                                    </td>
                                    <td className='px-4 py-2'>
                                        <div className='w-[60px] aspect-[3/4] relative overflow-hidden rounded-md border border-gray-200'>
                                            <Image
                                                src={imgSrc}
                                                alt={film.title}
                                                fill
                                                className='object-cover object-center'
                                            />
                                        </div>
                                    </td>
                                    <td className='px-4 py-2 font-medium'>{film.title}</td>
                                    <td className='px-4 py-2 text-gray-700 dark:text-gray-300'>{film.year}</td>
                                    <td className='px-4 py-2 text-gray-600 dark:text-gray-400'>{duration}</td>
                                    <td className='px-4 py-2 text-gray-600 dark:text-gray-400'>{film.rating.toFixed(1)}</td>

                                    <td className='px-4 py-2'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        onClick={() => onEdit(film.id)}
                                                        className='rounded-full cursor-pointer w-8 h-8 bg-[#f4f3f3] border border-[#dbdbdb] hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors'
                                                    >
                                                        <Pencil className='h-4 w-4 text-gray-600 dark:text-white' />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side='bottom'>{t('edit')}</TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        onClick={() => onDelete(film.id)}
                                                        className='rounded-full cursor-pointer w-8 h-8 bg-[#f4f3f3] border border-[#dbdbdb] hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors'
                                                    >
                                                        <Trash className='h-4 w-4 text-gray-600 dark:text-white' />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side='bottom'>{t('delete')}</TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
