'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
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
import { getUserColumns } from './columns'
import { getMockUsers } from '@/app/[locale]/admin/_mock/users.mock'
import { AuthUserType } from '@/types/models/user.model'

export default function UsersDataTable() {
    const t = useTranslations('AdminPage.usersPage')

    const [users, setUsers] = useState<AuthUserType[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    useEffect(() => setUsers(getMockUsers(50)), [])

    const onToggleLock = (id: string) =>
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, is_enabled: !u.is_enabled } : u)))

    const columns = getUserColumns(t, onToggleLock)

    const table = useReactTable({
        data: users,
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
                <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Users</h1>

                <div className='flex items-center gap-4 min-w-[300px] max-w-[500px]'>
                    <div className='relative flex-1'>
                        <Input
                            placeholder='Email'
                            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                            onChange={(e) => table.getColumn('email')?.setFilterValue(e.target.value)}
                            className='pl-8 w-full'
                        />
                        <Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300' />
                    </div>
                </div>
            </div>

            <div className='overflow-x-auto'>
                <Table className='min-w-full border-separate border-spacing-0'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='bg-gray-50 dark:bg-white/5'>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className='text-left font-semibold text-gray-700 dark:text-gray-200 p-3 border-b border-gray-200 dark:border-gray-600'
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
                                    No results.
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
