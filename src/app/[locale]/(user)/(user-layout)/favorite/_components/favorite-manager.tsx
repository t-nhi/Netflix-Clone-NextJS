'use client'

import { useState, useCallback } from 'react'
import FavoriteHead from './favorite-head'
import FavoriteList from './list-favorite-films'
import { getMockFilms } from '@/_mock'
import { FilmDetailType } from '@/types/film.type'

export default function FavoriteManager() {
    const [isEditing, setIsEditing] = useState(false)
    const [selectedMovies, setSelectedMovies] = useState<string[]>([])
    const [movies, setMovies] = useState<FilmDetailType[]>(() => getMockFilms(50))
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleSelect = useCallback((id: string) => {
        setSelectedMovies((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
    }, [])

    const handleSelectAll = useCallback(() => {
        if (selectedMovies.length === movies.length) {
            setSelectedMovies([])
        } else {
            setSelectedMovies(movies.map((m) => m.id))
        }
    }, [selectedMovies.length, movies])

    const reloadList = useCallback(() => {
        setIsRefreshing(true)
        setSelectedMovies([])
        setIsEditing(false)

        setTimeout(() => {
            setMovies(getMockFilms(50))
            setIsRefreshing(false)
        }, 1500)
    }, [])

    return (
        <>
            <FavoriteHead
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                selectedMovies={selectedMovies}
                setSelectedMovies={setSelectedMovies}
                onSelectAll={handleSelectAll}
                allSelected={selectedMovies.length === movies.length}
                onReloadList={reloadList}
            />

            {isRefreshing ? (
                <div className='flex justify-center items-center h-[60vh] text-gray-400'>
                    <div className='animate-spin rounded-full h-8 w-8 border-2 border-gray-400 border-t-transparent mr-3'></div>
                </div>
            ) : (
                <FavoriteList
                    isEditing={isEditing}
                    selectedMovies={selectedMovies}
                    onSelect={handleSelect}
                    movies={movies}
                />
            )}
        </>
    )
}
