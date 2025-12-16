'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, X, Film } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation' // 1. Import hook lấy params
import { useGetTop10MoviesQuery } from '@/store/services/movie/movie.services'

interface MovieSearchBoxProps {
    className?: string
}

export default function MovieSearchBox({ className }: MovieSearchBoxProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const urlQuery = searchParams.get('q')

    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const t = useTranslations('SearchPage.searchDropdown')
    const { data: top10Data, isLoading } = useGetTop10MoviesQuery()

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (urlQuery) {
            setQuery(urlQuery)
        } else {
            setQuery('')
        }
    }, [urlQuery])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [isOpen])

    const handleNavigation = (searchTerm: string) => {
        setIsOpen(false)

        router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        handleNavigation(query)
    }

    const handleClear = () => {
        setQuery('')
        if (urlQuery) {
            router.back()
        }
        inputRef.current?.focus()
    }

    const showSuggestions = !urlQuery || query !== urlQuery
    const topFilms = top10Data?.data || []

    return (
        <div ref={containerRef} className='relative inline-block text-left'>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-colors hover:cursor-pointer',
                    className
                )}
                title={t('title')}
            >
                <Search className={cn('w-5 h-5 text-white', className)} />
            </Button>

            {isOpen && (
                <div
                    className={cn(
                        'absolute top-full right-0 mt-2 z-50 flex flex-col w-[420px] shadow-2xl border',
                        'bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-700',
                        'overflow-hidden animate-[slideDown_.18s_ease-out]'
                    )}
                >
                    <form onSubmit={handleSubmit} className='p-4 border-b border-gray-200 dark:border-gray-700'>
                        <div className='relative'>
                            <Search
                                className={cn(
                                    'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500',
                                    className
                                )}
                            />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t('placeholder')}
                                className='w-full pl-12 pr-10 py-3 rounded-lg
                                           border border-gray-300 dark:border-gray-600
                                           bg-white dark:bg-black
                                           text-black dark:text-white
                                           placeholder:text-gray-500 dark:placeholder:text-gray-400
                                           focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white
                                           focus:border-black dark:focus:border-white
                                           transition-all'
                            />
                            {query && (
                                <button
                                    type='button'
                                    className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full hover:cursor-pointer'
                                    onClick={handleClear}
                                >
                                    <X className='w-4 h-4 text-gray-400 dark:text-gray-300' />
                                </button>
                            )}
                        </div>
                    </form>

                    {showSuggestions && (
                        <div className='flex-1 max-h-[340px] overflow-y-auto custom-scrollbar p-2'>
                            <p className='text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-3 mt-2'>
                                {t('filmsonTrend')}
                            </p>
                            {isLoading ? (
                                <p className='text-sm px-3 py-2 text-gray-500'>Loading...</p>
                            ) : (
                                <div className='flex flex-col gap-1'>
                                    {topFilms.map((item, idx) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigation(item.title)}
                                            className='group w-full flex items-center gap-3 px-3 py-3 text-left
                                                   rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200 hover:cursor-pointer'
                                        >
                                            <div
                                                className='w-6 h-6 text-xs font-bold border border-gray-400 dark:border-gray-600 rounded-full flex items-center justify-center shrink-0
                                                       group-hover:bg-black dark:group-hover:bg-white
                                                       group-hover:text-white dark:group-hover:text-black transition-colors'
                                            >
                                                {idx + 1}
                                            </div>
                                            <div className='flex-1 min-w-0'>
                                                <span className='text-sm font-medium block truncate text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white'>
                                                    {item.title}
                                                </span>
                                            </div>
                                            <Film className='w-4 h-4 text-gray-500 dark:text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity' />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
