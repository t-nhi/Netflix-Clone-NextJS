'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Search, ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react'
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
import { getUserColumns } from './users-columns'
import {
    useBanAccountMutation,
    useUnlockAccountMutation,
    useGetAllAccountsQuery,
    useGetAccountsByRoleQuery,
    useGetAccountsByStatusQuery
} from '@/store/services/manager-account/manager-account.services'
import { useGetRolesQuery } from '@/store/services/role/role.services'
import { toast } from 'sonner'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function UsersDataTable() {
    const t = useTranslations('AdminPage.usersPage')
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const [roleFilter, setRoleFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const { data: allAccountsRes, isLoading, isError, refetch: refetchAllAccounts } = useGetAllAccountsQuery()
    const { data: rolesRes } = useGetRolesQuery()

    const roleQuery = useGetAccountsByRoleQuery(roleFilter, { skip: !roleFilter || roleFilter === 'all' })
    const statusQuery = useGetAccountsByStatusQuery(statusFilter === 'enabled', {
        skip: !statusFilter || statusFilter === 'all'
    })

    const data = useMemo(() => {
        if (roleFilter && roleFilter !== 'all') return roleQuery.data?.data || []
        if (statusFilter && statusFilter !== 'all') return statusQuery.data?.data || []
        return allAccountsRes?.data || []
    }, [roleFilter, roleQuery.data, statusFilter, statusQuery.data, allAccountsRes?.data])

    const [dialogOpen, setDialogOpen] = useState(false)
    const [pendingUser, setPendingUser] = useState<{ id: string; is_enabled: boolean } | null>(null)
    const [banAccount] = useBanAccountMutation()
    const [unlockAccount] = useUnlockAccountMutation()

    const onClick = (id: string, is_enabled: boolean) => {
        setPendingUser({ id, is_enabled })
        setDialogOpen(true)
    }

    const confirmOption = async () => {
        if (!pendingUser) return
        try {
            if (pendingUser.is_enabled) {
                await banAccount({ params: { id: pendingUser.id } }).unwrap()
                toast.success(t('messages.lockSuccess'))
            } else {
                await unlockAccount({ params: { id: pendingUser.id } }).unwrap()
                toast.success(t('messages.unlockSuccess'))
            }
            refetchAllAccounts()
            setDialogOpen(false)
        } catch (error) {
            console.error('Error managing account:', error)
        }
    }

    const columns = getUserColumns({ t, onManager: onClick })

    const table = useReactTable({
        data,
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

    useEffect(() => {
        table.setPageIndex(0)
    }, [roleFilter, statusFilter])

    return (
        <div className='w-full max-w-[1200px] mx-auto rounded-lg shadow-lg overflow-hidden bg-white dark:bg-black/90'>
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-black/60 bg-white dark:bg-black/90 shadow-sm'>
                <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>{t('title')}</h1>

                <div className='flex items-center gap-4 min-w-[300px] max-w-[750px]'>
                    <div className='relative flex-1'>
                        <Input
                            placeholder={t('searchUsers')}
                            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                            onChange={(e) => table.getColumn('email')?.setFilterValue(e.target.value)}
                            className='pl-10 w-full'
                        />
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className='w-[150px] hover:cursor-pointer'>
                            <SelectValue placeholder={t('roleDropdown.placehoder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='all'>{t('roleDropdown.all')}</SelectItem>
                            {rolesRes?.data?.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                    {role.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className='w-[150px] hover:cursor-pointer'>
                            <SelectValue placeholder={t('statusDropdown.placehoder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='all'>{t('statusDropdown.all')}</SelectItem>
                            <SelectItem value='enabled'>{t('statusDropdown.enabled')}</SelectItem>
                            <SelectItem value='disabled'>{t('statusDropdown.disabled')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <>
                <div className='overflow-x-auto'>
                    <Table className='min-w-full border-separate border-spacing-0'>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className='bg-gray-50 dark:bg-white/5'>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className='text-left font-semibold text-gray-700 dark:text-gray-200 p-4 border-b border-gray-200 dark:border-gray-700'
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
                        {isLoading ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={columns.length} className='h-32 text-center'>
                                        <LoaderCircle className='animate-spin mx-auto w-6 h-6 text-gray-500 dark:text-gray-300' />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : isError ? (
                            <p className='p-12 text-center text-red-500'>{t('messages.errorLoading')}</p>
                        ) : (
                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className='border-b hover:bg-gray-50 dark:hover:bg-white/5 transition-colors'
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={cell.id}
                                                    className='p-4 text-gray-700 dark:text-gray-300 text-sm'
                                                >
                                                    {typeof cell.column.columnDef.cell === 'function'
                                                        ? cell.column.columnDef.cell(cell.getContext())
                                                        : cell.column.columnDef.cell}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className='h-32 text-center text-gray-500 dark:text-gray-400'
                                        >
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        )}
                    </Table>
                </div>

                <div className='flex items-center justify-center gap-6 p-4 border-t border-gray-200 dark:border-gray-700'>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className='w-4 h-4' />
                    </Button>

                    <span className='text-sm text-gray-600 dark:text-gray-300'>
                        <strong>{table.getPageCount() > 0 ? table.getState().pagination.pageIndex + 1 : 0}</strong> /{' '}
                        <strong>{table.getPageCount()}</strong>
                    </span>

                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className='w-4 h-4' />
                    </Button>
                </div>
            </>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className='dark:bg-neutral-900 dark:text-neutral-100'>
                    <DialogHeader>
                        <DialogTitle>{t('dialogConfirm.title')}</DialogTitle>

                        <DialogDescription className='dark:text-neutral-300'>
                            {pendingUser?.is_enabled
                                ? t('dialogConfirm.confirmDisable')
                                : t('dialogConfirm.confirmEnable')}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className='gap-3'>
                        <DialogClose asChild>
                            <Button className='px-10 hover:cursor-pointer' variant='outline'>
                                {t('dialogConfirm.cancel')}
                            </Button>
                        </DialogClose>

                        <Button
                            className='px-10 hover:cursor-pointer bg-brand hover:bg-brand/85'
                            variant={pendingUser?.is_enabled ? 'destructive' : 'default'}
                            onClick={confirmOption}
                        >
                            {pendingUser?.is_enabled ? t('dialogConfirm.lock') : t('dialogConfirm.unlock')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
