'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import FavoriteCard from './movie-card/movie-favorite-card'
import { getMockFilms } from '@/_mock'
import { MovieFavoriteCardHoverInfoProvider } from './movie-card/movie-favorite-hover-card'
import { MovieType } from '@/types/models/movie.model'
import { useGetCustomerFavoritesQuery } from '@/store/services/favorite/favorite.services'

interface FavoriteListProps {
    movies?: MovieType[]
    isEditing: boolean
    selectedMovies: string[]
    onSelect: (id: string) => void
}

export default function FavoriteList({ isEditing, selectedMovies, onSelect }: FavoriteListProps) {
    // const mockMovies = useMemo(() => getMockFilms(50), [])
    const { data: favoriteData, isLoading } = useGetCustomerFavoritesQuery()
    const movieList = (favoriteData?.data || []) as MovieType[]
    const t = useTranslations('FavoritePage')

    const renderEmptyState = () => (
        <div className='flex flex-col items-center justify-center py-8 w-2/3 mx-auto'>
            <Image
                src='/images/history/empty-watched.png'
                alt='empty-favorite'
                width={250}
                height={250}
                className='opacity-70 mb-4'
            />
            <p className='text-gray-400 text-sm text-center'>{t('noFavorites')}</p>
        </div>
    )

    // if (mockMovies.length === 0) return renderEmptyState()
    if (isLoading) return null
    if (!isLoading && movieList.length === 0) return renderEmptyState()

    return (
        <div className='mx-auto w-full min-h-screen'>
            <div
                className='grid gap-3 px-6 md:px-8 lg:px-14
                        grid-cols-[repeat(auto-fit,minmax(160px,1fr))]
                        sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
                        lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
                        xl:grid-cols-[repeat(6,1fr)]'
            >
                {movieList.map((movie) => (
                    <MovieFavoriteCardHoverInfoProvider key={movie.id} movie={movie} disableHover={isEditing}>
                        <FavoriteCard
                            movie={movie}
                            isEditing={isEditing}
                            isSelected={selectedMovies.includes(movie.id)}
                            onSelect={() => onSelect(movie.id)}
                        />
                    </MovieFavoriteCardHoverInfoProvider>
                ))}
            </div>
        </div>
    )
}
