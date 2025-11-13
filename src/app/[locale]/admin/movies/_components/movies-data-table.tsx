'use client'

import { useEffect, useState } from 'react'
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
    ColumnFiltersState
} from '@tanstack/react-table'
import { MovieType } from '@/types/models/movie.model'
import { getMovieColumns } from './movies-columns'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { toast } from 'sonner'
import { getMockFilms } from '@/_mock'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter } from 'next/navigation'

export default function MoviesDataTable() {
    const t = useTranslations('AdminPage.filmsPage')
    const [films, setFilms] = useState<MovieType[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const router = useRouter()

    useEffect(() => {
        setFilms(getMockFilms(20))
    }, [])

    const onEdit = (id: string) => {
        const film = films.find((f) => f.id === id)
        if (!film) return
        router.push(`/admin/movies/edit/${encodeURIComponent(id)}`)
    }

    const onDelete = (id: string) => {
        const film = films.find((f) => f.id === id)
        if (!film) return
        const confirmDelete = confirm(`Delete ${film.title}?`)
        if (!confirmDelete) return

        setFilms((prev) => prev.filter((f) => f.id !== id))
        toast.success('Deleted successfully')
    }
    const onPromote = (id: string) => {
        const film = films.find((f) => f.id === id)
        if (!film) return
        alert(`Promote film: ${film.title} to users`)
    }

    const columns = getMovieColumns({ t, onEdit, onDelete, onPromote })

    const table = useReactTable({
        data: films,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: { sorting, columnFilters }
    })

    return (
        <div className='w-full max-w-[1200px] mx-auto rounded-lg shadow-lg overflow-hidden bg-white dark:bg-black/90'>
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-black/60 bg-white dark:bg-black/90 shadow-sm'>
                <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>{t('title')}</h1>

                <div className='flex items-center gap-4 min-w-[300px] max-w-[500px]'>
                    <div className='relative flex-1'>
                        <Input
                            placeholder={t('name')}
                            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                            onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value)}
                            className='pl-8 w-full'
                        />
                        <Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300' />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => router.push('/admin/movies/add')}
                                className='rounded-full p-1 shrink-0 cursor-pointer w-8 h-8 transition-colors duration-300 border-2 border-black dark:border-white text-black dark:text-white bg-black/3 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10'
                            >
                                <Plus className='h-4 w-4 font-bold' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>{t('addFilm')}</TooltipContent>
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
                                    className='border-b hover:bg-gray-50 dark:hover:bg-white/10 transition-colors'
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className='p-3 text-gray-600 dark:text-gray-300 text-sm'
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
                                    className='h-24 text-center text-gray-400 dark:text-gray-300'
                                >
                                    {t('emptyFilm')}
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
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className='w-4 h-4' />
                </Button>

                <div className='text-gray-500 text-sm dark:text-gray-300'>
                    {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </div>

                <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    <ChevronRight className='w-4 h-4' />
                </Button>
            </div>
        </div>
    )
}
