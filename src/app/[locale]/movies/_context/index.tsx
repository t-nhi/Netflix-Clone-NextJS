'use client'

import { useContext, useState, createContext } from 'react'

export const HERO_VIEW_MODE = {
    slides: 'slides',
    videos: 'videos'
} as const
export type HeroViewModeType = (typeof HERO_VIEW_MODE)[keyof typeof HERO_VIEW_MODE]

interface MoviesContextProps {
    heroViewMode: HeroViewModeType
    setHeroViewMode: (mode: HeroViewModeType) => void
}

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined)

export default function MoviesPageProvider({ children }: { children: React.ReactNode }) {
    const [heroViewMode, setHeroViewMode] = useState<HeroViewModeType>('videos')

    return (
        <MoviesContext.Provider
            value={{
                heroViewMode,
                setHeroViewMode
            }}
        >
            {children}
        </MoviesContext.Provider>
    )
}

export function useMoviesPageContext() {
    const context = useContext(MoviesContext)
    if (!context) {
        throw new Error('useMoviesContext must be used within a MoviesProvider')
    }
    return context
}
