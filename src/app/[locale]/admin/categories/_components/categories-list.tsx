'use client'

import { getMockCategories } from '@/app/[locale]/admin/_mock/categories.mock'
import { CategoryType } from '@/types/category.type'
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useEffect, useState } from 'react'
import { maskId } from '@/utils/formatting/formatId'
import { useTranslations } from 'next-intl'

type CategoriesListProps = {
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

export default function CategoriesList({ onEdit, onDelete }: CategoriesListProps) {
    const t = useTranslations('AdminPage.genresPage')
    const [genres, setGenres] = useState<CategoryType[]>([])

    useEffect(() => {
        setGenres(getMockCategories(20))
    }, [])

    if (genres.length === 0) {
        return <div className='text-center py-12 text-gray-500'>{t('messages.emptyGenre')}</div>
    }

    return (
        <div className=' rounded-lg shadow overflow-hidden w-full max-w-[1200px] mx-auto'>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm border-collapse min-w-[800px]'>
                    <thead>
                        <tr>
                            <th
                                colSpan={6}
                                className='px-4 py-4 text-lg font-semibold text-gray-800 dark:text-white border-b text-left'
                            >
                                {t('title')}
                            </th>
                        </tr>
                        <tr className='bg-gray-100 dark:bg-white/20 text-left text-gray-700 dark:text-gray-400'>
                            <th className='px-4 py-2 font-medium'>{t('id')}</th>
                            <th className='px-4 py-2 font-medium'>{t('name')}</th>
                            <th className='px-4 py-2 font-medium'>{t('description')}</th>
                            <th className='px-4 py-2 font-medium'>{t('createdAt')}</th>
                            <th className='px-4 py-2 font-medium'>{t('updatedAt')}</th>
                            <th className='px-4 py-2 font-medium text-center'>{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map((genre) => {
                            const maskedId = maskId(genre.id)
                            return (
                                <tr
                                    key={genre.id}
                                    className='border-t hover:bg-gray-50 dark:hover:bg-white/10 transition-colors'
                                >
                                    <td className='px-4 py-2 text-gray-900 dark:text-white font-mono text-xs'>
                                        {maskedId}
                                    </td>
                                    <td className='px-4 py-2 font-medium'>{genre.name}</td>
                                    <td
                                        className='px-4 py-2 text-gray-900 dark:text-gray-300 font-mono text-xs max-w-xs truncate'
                                        title={genre.description}
                                    >
                                        {genre.description}
                                    </td>
                                    <td className='px-4 py-2 text-gray-600 dark:text-gray-400 font-mono text-xs'>
                                        {genre.createdAt}
                                    </td>
                                    <td className='px-4 py-2 text-gray-600 dark:text-gray-400 font-mono text-xs'>
                                        {genre.updatedAt}
                                    </td>
                                    <td className='px-4 py-2'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        onClick={() => onEdit(genre.id)}
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
                                                        onClick={() => onDelete(genre.id)}
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
