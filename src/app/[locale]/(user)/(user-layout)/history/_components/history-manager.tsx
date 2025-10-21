'use client'

import { useState } from 'react'
import { getMockFilms } from '@/_mock'
import { FilmDetailType } from '@/types/film.type'
import WatchHistoryHead from '@/app/[locale]/(user)/(user-layout)/history/_components/watched-head'
import HistoryBlock from '@/app/[locale]/(user)/(user-layout)/history/_components/history-block'

export default function HistoryManager() {
    const [isEditing, setIsEditing] = useState(false)
    const [selectedMovies, setSelectedMovies] = useState<string[]>([])

    const movies: FilmDetailType[] = getMockFilms(50)

    const handleSelect = (id: string) => {
        setSelectedMovies((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
    }

    const handleSelectAll = () => {
        if (selectedMovies.length === movies.length) {
            setSelectedMovies([])
        } else {
            setSelectedMovies(movies.map((m) => m.id))
        }
    }

    return (
        <>
            <WatchHistoryHead
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                selectedMovies={selectedMovies}
                setSelectedMovies={setSelectedMovies}
                onSelectAll={handleSelectAll}
                allSelected={selectedMovies.length === movies.length}
            />
            <HistoryBlock
                isEditing={isEditing}
                selectedMovies={selectedMovies}
                onSelect={handleSelect}
                movies={movies}
            />
        </>
    )
}
