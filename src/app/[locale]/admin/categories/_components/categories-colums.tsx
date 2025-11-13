'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowUpDown, Pencil, Trash } from 'lucide-react'
import { maskId } from '@/utils/formatting/formatId'
import { CategoryType } from '@/types/category.type'
import { useTranslations } from 'next-intl'

type TranslationFunction = ReturnType<typeof useTranslations>
interface CategoryColumnProps {
    t: TranslationFunction
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

export const getCategoryColumns = ({ t, onEdit, onDelete }: CategoryColumnProps): ColumnDef<CategoryType>[] => [
    {
        accessorKey: 'id',
        header: t('id'),
        size: 80,
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-900 dark:text-white text-center' style={{ width: '5%' }}>
                {maskId(row.original.id)}
            </div>
        )
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                className='hover:cursor-pointer'
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                {t('name')} <ArrowUpDown className='inline w-4 h-4' />
            </Button>
        ),
        size: 150,
        cell: ({ row }) => <div className='font-medium text-gray-800 dark:text-gray-100'>{row.original.name}</div>
    },
    {
        accessorKey: 'description',
        header: t('description'),
        size: 400,
        cell: ({ row }) => (
            <div
                className='font-mono text-xs text-gray-700 dark:text-gray-300 max-w-xs truncate'
                title={row.original.description}
            >
                {row.original.description}
            </div>
        )
    },
    {
        accessorKey: 'createdAt',
        header: t('createdAt'),
        size: 120,
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-600 dark:text-gray-400 truncate'>{row.original.createdAt}</div>
        )
    },
    {
        accessorKey: 'updatedAt',
        header: t('updatedAt'),
        size: 120,
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-600 dark:text-gray-400 truncate'>{row.original.updatedAt}</div>
        )
    },
    {
        id: 'actions',
        header: () => <div className='flex justify-center w-full'>{t('action')}</div>,
        size: 100,
        cell: ({ row }) => {
            const category = row.original
            return (
                <div className='flex items-center justify-center gap-1'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => onEdit(category.id)}
                                className='rounded-full w-8 h-8 bg-[#f4f3f3] border border-[#dbdbdb] hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10'
                            >
                                <Pencil className='h-4 w-4 text-gray-600 dark:text-white' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>{t('edit')}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => onDelete(category.id)}
                                className='rounded-full w-8 h-8 bg-[#f4f3f3] border border-[#dbdbdb] hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10'
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
