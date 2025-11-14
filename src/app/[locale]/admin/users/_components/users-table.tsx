'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { ArrowUpDown, ChevronLeft, ChevronRight, Lock, Search, Unlock } from 'lucide-react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
    VisibilityState
} from '@tanstack/react-table'
import { maskId } from '@/utils/formatting/formatId'
import { useEffect, useState } from 'react'
import { getMockUsers } from '@/app/[locale]/admin/_mock/users.mock'
import { UserSummaryType } from '@/types/dtos/customer/user.dto'

export default function UsersTable() {
    const t = useTranslations('AdminPage.usersPage')

    const [users, setUsers] = useState<UserSummaryType[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    useEffect(() => setUsers(getMockUsers(50)), [])

    const onToggleLock = (id: string) =>
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, is_enabled: !u.is_enabled } : u)))

    const columns: ColumnDef<UserSummaryType>[] = [
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
                    <span
                        className={`w-3 h-3 rounded-full ${row.original.is_enabled ? 'bg-green-500' : 'bg-red-500'}`}
                    />
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
                        {/* <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => navigator.clipboard.writeText(user.id)}
                            title='Copy ID'
                            className='hover:cursor-pointer'
                        >
                            <Clipboard className='w-4 h-4 text-gray-600 dark:text-gray-300' />
                        </Button> */}
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => onToggleLock(user.id)}
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

                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='flex items-center gap-1 whitespace-nowrap'>
                                Columns <ChevronDown className='w-4 h-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='min-w-[180px] p-2'>
                            {table
                                .getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.id}
                                        checked={col.getIsVisible()}
                                        onCheckedChange={(v) => col.toggleVisibility(!!v)}
                                        className='capitalize py-1'
                                    >
                                        {col.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu> */}
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
                                            : flexRender(header.column.columnDef.header, header.getContext())}
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
