'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    ColumnFiltersState,
    VisibilityState
} from '@tanstack/react-table'
import { getActorColumns } from './actors-columns'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter } from '@/i18n/navigation'
import { useDeleteActorMutation, useGetAllActorsQuery } from '@/store/services/actor/actor.services'
import { AdminPaths } from '@/config/routes.config'

export default function ActorsDataTable() {
    const t = useTranslations('AdminPage.actorsPage')
    const { data: getActorsRes } = useGetAllActorsQuery()
    const actors = useMemo(() => getActorsRes?.data || [], [getActorsRes])

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const router = useRouter()

    const [deleteActorMutate] = useDeleteActorMutation()

    const onEdit = (id: string) => {
        router.push(`${AdminPaths.ACTORS}/${id}/edit`)
    }

    const onDelete = async (id: string) => {
        try {
            const response = await deleteActorMutate({ params: { id } }).unwrap()
            toast.success(response.message)
        } catch (error) {
            console.error('Error deleting actor:', error)
        }
    }

    const columns = getActorColumns({ t, onEdit, onDelete })

    const table = useReactTable({
        data: actors,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: { sorting, columnFilters, columnVisibility, rowSelection }
    })

    return (
        <div className='w-full max-w-[1200px] mx-auto rounded-lg shadow-lg overflow-hidden bg-white dark:bg-black/90'>
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-black/60 bg-white dark:bg-black/90 shadow-sm'>
                <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>{t('title')}</h1>

                <div className='flex items-center gap-4 min-w-[300px] max-w-[500px]'>
                    <div className='relative flex-1'>
                        <Input
                            placeholder={t('name')}
                            value={(table.getColumn('fullName')?.getFilterValue() as string) ?? ''}
                            onChange={(e) => table.getColumn('fullName')?.setFilterValue(e.target.value)}
                            className='pl-8 w-full'
                        />
                        <Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300' />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => router.push(`${AdminPaths.ACTORS}/add`)}
                                className='rounded-full p-1 shrink-0 cursor-pointer w-8 h-8 transition-colors duration-300 border-2 border-black dark:border-white text-black dark:text-white bg-black/3 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10'
                            >
                                <Plus className='h-4 w-4 font-bold' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>{t('addActor')}</TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <div className='overflow-auto overscroll-none'>
                <Table className='min-w-full border-separate border-spacing-0'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='bg-gray-50 dark:bg-white/5'>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className='p-3 text-left font-medium text-gray-800 dark:text-gray-100 text-sm border-b border-gray-200 dark:border-gray-600'
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : typeof header.column.columnDef.header === 'function'
                                              ? header.column.columnDef.header(header.getContext())
                                              : header.column.columnDef.header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className='border-b hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer'
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className='p-3 text-gray-600 dark:text-gray-300 text-sm'
                                        >
                                            {cell.column.columnDef.cell &&
                                                (typeof cell.column.columnDef.cell === 'function'
                                                    ? cell.column.columnDef.cell(cell.getContext())
                                                    : cell.column.columnDef.cell)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center text-gray-400 dark:text-gray-300'
                                >
                                    {t('messages.emptyActor ')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className='flex flex-row items-center justify-center space-x-2 p-4 border-t border-gray-200 dark:border-gray-700'>
                <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center justify-center'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className='w-4 h-4' />
                </Button>

                <div className='text-gray-500 text-sm dark:text-gray-300'>
                    {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </div>

                <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center justify-center'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className='w-4 h-4' />
                </Button>
            </div>
        </div>
    )
}
