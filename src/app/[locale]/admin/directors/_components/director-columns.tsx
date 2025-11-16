'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Pencil, Trash, ArrowUpDown } from 'lucide-react'
import { maskId } from '@/utils/formatting/formatId'
import { useTranslations } from 'next-intl'
import { DirectorType } from '@/types/models/director.model'
import { getServerUrl } from '@/utils/url.util'

type TranslationFunction = ReturnType<typeof useTranslations>
interface DirectorColumnProps {
    t: TranslationFunction
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}
export const getDirectorColumns = ({ t, onEdit, onDelete }: DirectorColumnProps): ColumnDef<DirectorType>[] => [
    {
        accessorKey: 'id',
        header: t('id'),
        size: 80,
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-900 dark:text-gray-200'>{maskId(row.original.id)}</div>
        )
    },
    {
        accessorKey: 'image',
        header: t('image'),
        size: 100,
        cell: ({ row }) => {
            const src = row.original.avatar ? getServerUrl(row.original.avatar) : '/images/common/avatar_default.png'
            return (
                <div className='w-20 aspect-3/4 relative overflow-hidden rounded-md border border-gray-200'>
                    <Image src={src} alt={row.original.fullname} fill className='object-cover object-center' />
                </div>
            )
        }
    },
    {
        accessorKey: 'fullName',
        size: 200,
        header: ({ column }) => (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                {t('name')} <ArrowUpDown className='inline w-4 h-4' />
            </Button>
        ),
        cell: ({ row }) => <div className='font-medium text-gray-800 dark:text-gray-100'>{row.original.fullname}</div>
    },
    {
        accessorKey: 'biography',
        header: t('bio'),
        size: 400,
        cell: ({ row }) => (
            <div
                className='font-mono text-xs text-gray-700 dark:text-gray-300 max-w-xs truncate'
                title={row.original.biography || ''}
            >
                {row.original.biography}
            </div>
        )
    },
    {
        accessorKey: 'dateOfBirth',
        header: t('dateOfBirth'),
        size: 120,
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-600 dark:text-gray-400'>{row.original.dateOfBirth}</div>
        )
    },
    {
        id: 'actions',
        header: () => <div className='text-center'>{t('action')}</div>,
        size: 100,
        cell: ({ row }) => {
            const actor = row.original

            return (
                <div className='flex items-center justify-center gap-1'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => onEdit(actor.id)}
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
                                onClick={() => onDelete(actor.id)}
                                className='rounded-full cursor-pointer w-8 h-8 bg-[#f4f3f3] border border-[#dbdbdb] hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors'
                            >
                                <Trash className='h-4 w-4 text-gray-600 dark:text-white' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>{t('delete')}</TooltipContent>
                    </Tooltip>
                </div>
            )
        }
    }
]
