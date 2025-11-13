'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Pencil, Trash, ArrowUpDown, CheckIcon, MinusIcon, TrendingUp } from 'lucide-react'
import { maskId } from '@/utils/formatting/formatId'
import { MovieType } from '@/types/models/movie.model'
import { useTranslations } from 'next-intl'

const imageSrc = (url: string): string => {
    if (url?.startsWith('/public')) return url.replace('/public', '')
    return url
}

type TranslationFunction = ReturnType<typeof useTranslations>

interface MovieColumnProps {
    t: TranslationFunction
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    onPromote: (id: string) => void
}

export const getMovieColumns = ({ t, onEdit, onDelete, onPromote }: MovieColumnProps): ColumnDef<MovieType>[] => [
    {
        accessorKey: 'id',
        header: t('id'),
        size: 80,
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-900 dark:text-gray-200'>{maskId(row.original.id)}</div>
        )
    },
    {
        accessorKey: 'vertical_poster',
        header: t('poster'),
        size: 100,
        cell: ({ row }) => {
            const src = imageSrc(row.original.vertical_poster || '/images/film/default.png')
            return (
                <div className='w-[60px] aspect-3/4 relative overflow-hidden rounded-md border border-gray-200'>
                    <Image src={src} alt={row.original.title} fill className='object-cover object-center' />
                </div>
            )
        }
    },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <Button
                className='hover:cursor-pointer'
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                {t('name')} <ArrowUpDown className='inline w-4 h-4 ml-1' />
            </Button>
        ),
        cell: ({ row }) => <div className='font-medium text-gray-800 dark:text-gray-100'>{row.original.title}</div>
    },
    {
        accessorKey: 'year',
        size: 100,
        header: () => <div className='text-center font-medium'>{t('year')}</div>,
        cell: ({ row }) => (
            <div className='px-4 py-2 text-center text-gray-600 dark:text-gray-400'>{row.original.year}</div>
        )
    },
    {
        accessorKey: 'duration_minutes',
        header: () => <div className='text-center font-medium'>{t('duration')}</div>,
        size: 140,
        cell: ({ row }) => {
            const total = row.original.duration_minutes
            const duration = `${Math.floor(total / 60)}h ${total % 60}m`
            return <div className='px-4 py-2 text-center text-gray-600 dark:text-gray-400'>{duration}</div>
        }
    },
    {
        accessorKey: 'rating',
        header: () => <div className='flex justify-center w-full text-sm font-medium'>{t('rating')}</div>,
        size: 100,
        cell: ({ row }) => (
            <div className='text-gray-600 text-center dark:text-gray-400'>{row.original.rating.toFixed(1)}</div>
        )
    },
    {
        accessorKey: 'isVip',
        header: () => <div className='flex justify-center w-full text-sm font-medium'>VIP</div>,
        size: 20,
        cell: ({ row }) => (
            <div className='flex justify-center'>
                {row.original.isVip ? (
                    <div className='flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full'>
                        <CheckIcon className='w-4 h-4 text-emerald-700' />
                    </div>
                ) : (
                    <div className='flex items-center justify-center w-6 h-6'>
                        <MinusIcon className='w-4 h-4 text-gray-500' />
                    </div>
                )}
            </div>
        )
    },

    {
        id: 'actions',
        header: () => <div className='text-center'>{t('actions')}</div>,
        size: 100,
        cell: ({ row }) => {
            const film = row.original

            return (
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

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => onPromote(film.id)}
                                className='rounded-full cursor-pointer w-8 h-8 bg-[#f4f3f3] border border-[#dbdbdb] hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors'
                            >
                                <TrendingUp className='h-4 w-4 text-green-700' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>{t('promoteToUsers')}</TooltipContent>
                    </Tooltip>
                </div>
            )
        }
    }
]
