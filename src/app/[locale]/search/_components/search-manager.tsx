'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Loader2, Frown, SearchX, LayoutGrid, List as ListIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

import SearchCard from './movie-search-card'
import { useSearchMoviesInfiniteQuery } from '@/store/services/movie/movie.services'
// import { MovieSummaryType } from '@/types/dtos/movie/movie.dto'

// export const mockMovies: MovieSummaryType[] = [
//     {
//         id: '1',
//         title: 'Anh Trai Say Hi',
//         description: 'Một bộ phim hài lãng mạn...',
//         horizontal_poster: '/mock/h1.jpg',
//         vertical_poster: '/mock/v1.jpg',
//         age: 16,
//         year: 2024,
//         country: 'Việt Nam',
//         isVip: false,
//         categories: ['Hài', 'Lãng mạn'],
//         actors: ['Diễn viên A', 'Diễn viên B'],
//         directors: ['Đạo diễn X']
//     },
//     {
//         id: '2',
//         title: 'Dragon Quest',
//         description: 'Phiêu lưu kỳ ảo đầy hấp dẫn...',
//         horizontal_poster: '/mock/h2.jpg',
//         vertical_poster: '/mock/v2.jpg',
//         age: 13,
//         year: 2023,
//         country: 'Nhật Bản',
//         isVip: true,
//         categories: ['Phiêu lưu', 'Fantasy'],
//         actors: ['Actor 1', 'Actor 2'],
//         directors: ['Director Z']
//     },
//     {
//         id: '3',
//         title: 'The Silent War',
//         description: 'Một cuộc chiến ngầm đầy căng thẳng...',
//         horizontal_poster: '/mock/h3.jpg',
//         vertical_poster: '/mock/v3.jpg',
//         age: 18,
//         year: 2022,
//         country: 'Mỹ',
//         isVip: false,
//         categories: ['Hành động', 'Kịch tính'],
//         actors: ['John Doe', 'Jane Smith'],
//         directors: ['David O']
//     }
// ]

export default function SearchManager() {
    const t = useTranslations('SearchPage.searchManager')
    const searchParams = useSearchParams()

    const query = searchParams.get('q') || ''

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } = useSearchMoviesInfiniteQuery(
        {
            query: {
                keyword: query,
                size: '20',
                sortBy: 'year',
                sortDirection: 'desc',
                userRole: 'USER'
            }
        },
        {
            skip: !query,
            refetchOnMountOrArgChange: true
        }
    )

    const movies = data?.pages.flatMap((page) => page.data) || []
    // const movies = mockMovies

    const totalResults = movies.length

    if (isLoading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[70vh]'>
                <Loader2 className='w-10 h-10 text-neutral-900 dark:text-white animate-spin mb-4' />
            </div>
        )
    }

    if (!isLoading && (movies.length === 0 || isError)) {
        return (
            <div className='relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4 overflow-hidden'>
                <SearchX
                    className='absolute text-neutral-200 dark:text-neutral-900/40 w-96 h-96 -z-10 blur-sm transition-colors duration-300'
                    strokeWidth={0.5}
                />

                <div
                    className={cn(
                        'p-6 rounded-2xl mb-6 shadow-2xl backdrop-blur-md border transition-all duration-300',
                        'bg-white/80 border-neutral-200 shadow-neutral-200/50',
                        'dark:bg-neutral-900/80 dark:border-neutral-800 dark:shadow-black/50'
                    )}
                >
                    <Frown className='w-12 h-12 text-neutral-800 dark:text-white transition-colors' strokeWidth={1.5} />
                </div>

                <h2 className='text-3xl font-extrabold text-neutral-900 dark:text-white mb-3 tracking-tight transition-colors'>
                    {isError ? t('error.title') : t('noResultsTitle')}
                </h2>
                <p className='text-neutral-500 dark:text-neutral-400 text-lg max-w-md leading-relaxed font-medium transition-colors'>
                    {isError ? t('error.errorConnect') : t('noResultsDesc') || t('error.retryChangeKeyword')}
                </p>
            </div>
        )
    }

    return (
        <div className='min-h-screen py-10 px-4 md:px-8 lg:px-14 space-y-10 transition-colors duration-300 bg-white dark:bg-black'>
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 transition-colors'>
                <div>
                    <h1 className='text-xl text-neutral-900 dark:text-white font-bold'>{t('title')}</h1>
                    <p className='text-neutral-500 dark:text-neutral-400 mt-2 font-medium text-[12px]'>
                        {t('subTitle')}
                    </p>
                </div>

                <div className='flex items-center gap-3'>
                    <div className='hidden sm:flex bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1 border border-neutral-200 dark:border-neutral-800'>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                'p-1.5 rounded-md transition-all',
                                viewMode === 'grid'
                                    ? 'bg-white dark:bg-neutral-800 shadow-sm text-black dark:text-white'
                                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                            )}
                            title={t('gridView')}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                'p-1.5 rounded-md transition-all',
                                viewMode === 'list'
                                    ? 'bg-white dark:bg-neutral-800 shadow-sm text-black dark:text-white'
                                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                            )}
                            title={t('listView')}
                        >
                            <ListIcon size={16} />
                        </button>
                    </div>

                    <div
                        className={cn(
                            'inline-flex items-center px-4 py-1.5 rounded-full border transition-all duration-300',
                            'bg-neutral-100 border-neutral-200 text-neutral-900',
                            'dark:bg-neutral-900 dark:border-neutral-800 dark:text-white'
                        )}
                    >
                        <span className='text-neutral-500 dark:text-neutral-400 mr-2 text-sm font-medium transition-colors'>
                            {t('foundLabel')}:
                        </span>
                        <span className='font-bold text-sm'>
                            {totalResults} {t('moviesUnit')}
                        </span>
                    </div>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10'>
                    {movies.map((movie) => (
                        <SearchCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className='flex flex-col gap-4 max-w-4xl mx-auto'>
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className='group flex gap-4 p-3 rounded-xl border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all duration-300'
                        >
                            <div className='w-40 sm:w-48 shrink-0'>
                                <SearchCard
                                    movie={movie}
                                    className='w-full shadow-none hover:shadow-none hover:scale-100'
                                />
                            </div>

                            <div className='flex flex-col py-1 min-w-0 flex-1'>
                                <h3 className='text-lg font-bold text-neutral-900 dark:text-white truncate transition-colors'>
                                    {movie.title}
                                </h3>
                                <div className='flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-3'>
                                    <span className='bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-300 font-medium'>
                                        {movie.year}
                                    </span>
                                    <span>•</span>
                                    <span>{movie.country}</span>
                                    {movie.age > 0 && (
                                        <>
                                            <span>•</span>
                                            <span className='border border-neutral-300 dark:border-neutral-700 px-1 rounded text-[10px]'>
                                                {movie.age}+
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className='text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 sm:line-clamp-3 leading-relaxed'>
                                    {movie.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {hasNextPage && (
                <div className='flex justify-center pt-10 pb-6'>
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetching}
                        className={cn(
                            'group flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300',
                            'border border-neutral-200 dark:border-neutral-800',
                            'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white',
                            'hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700',
                            'disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                    >
                        {isFetching ? (
                            <>
                                <Loader2 className='w-5 h-5 animate-spin' />
                            </>
                        ) : (
                            <>
                                <ChevronDown className='w-5 h-5 group-hover:translate-y-0.5 transition-transform' />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
