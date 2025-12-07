'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Lock, Unlock } from 'lucide-react'
import { maskId } from '@/utils/formatting/formatId'
import { useTranslations } from 'next-intl'
import { ManagerAccountType } from '@/types/dtos/manager-account/manager-account.dto'

type TranslationFuntion = ReturnType<typeof useTranslations>

interface UserColumnProps {
    t: TranslationFuntion
    onManager: (id: string, is_enabled: boolean) => void
}

export const getUserColumns = ({ t, onManager }: UserColumnProps): ColumnDef<ManagerAccountType>[] => [
    {
        accessorKey: 'id',
        header: t('id'),
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-900 dark:text-gray-200'>{maskId(row.original.id)}</div>
        )
    },
    {
        accessorKey: 'name',
        header: t('userName'),
        cell: ({ row }) => (
            <div className='font-medium text-gray-800 dark:text-gray-100'>
                {`${row.original.first_name} ${row.original.last_name}`.trim()}
            </div>
        )
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                {t('email')} <ArrowUpDown className='inline w-4 h-4' />
            </Button>
        ),
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-600 dark:text-gray-300'>{row.original.email}</div>
        )
    },
    {
        accessorKey: 'role.name',
        header: t('role'),
        cell: ({ row }) => (
            <div className='font-mono text-xs text-gray-600 dark:text-gray-300'>{row.original.role.name}</div>
        )
    },
    {
        accessorKey: 'is_enabled',
        header: t('accountStatus'),
        cell: ({ row }) => (
            <div className='flex items-center gap-2'>
                <span className={`w-3 h-3 rounded-full ${row.original.is_enabled ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className='font-mono text-xs text-gray-600 dark:text-gray-300'>
                    {row.original.is_enabled ? 'Enabled' : 'Disabled'}
                </span>
            </div>
        )
    },
    {
        id: 'actions',
        header: t('actions'),
        cell: ({ row }) => {
            const user = row.original
            return (
                <div className='flex items-center gap-2'>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => onManager(user.id, user.is_enabled)}
                        title={user.is_enabled ? 'Disable account' : 'Enable account'}
                        className='hover:cursor-pointer'
                    >
                        {user.is_enabled ? (
                            <Lock className='w-4 h-4 text-red-500' />
                        ) : (
                            <Unlock className='w-4 h-4 text-green-500' />
                        )}
                    </Button>
                </div>
            )
        }
    }
]
