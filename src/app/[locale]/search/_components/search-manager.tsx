'use client'

import { getMockFilms } from '@/_mock'
import SearchCard from './movie-search-card'
import { Frown, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export default function SearchManager() {
    const t = useTranslations('SearchPage.searchManager')

    const movies = getMockFilms(20)
    if (movies.length === 0) {
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
                    {t('noResultsTitle')}
                </h2>
                <p className='text-neutral-500 dark:text-neutral-400 text-lg max-w-md leading-relaxed font-medium transition-colors'>
                    {t('noResultsDesc')}
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
                        {movies.length} {t('moviesUnit')}
                    </span>
                </div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10'>
                {movies.map((movie) => (
                    <SearchCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}
