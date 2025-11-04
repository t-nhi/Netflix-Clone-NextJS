'use client'

import { useContext, useState, createContext } from 'react'

export const HERO_VIEW_MODE = {
    slides: 'slides',
    videos: 'videos'
} as const
export type HeroViewModeType = (typeof HERO_VIEW_MODE)[keyof typeof HERO_VIEW_MODE]

interface FilmsContextProps {
    heroViewMode: HeroViewModeType
    setHeroViewMode: (mode: HeroViewModeType) => void
}

const FilmsContext = createContext<FilmsContextProps | undefined>(undefined)

export default function FilmsPageProvider({ children }: { children: React.ReactNode }) {
    const [heroViewMode, setHeroViewMode] = useState<HeroViewModeType>('videos')

    return (
        <FilmsContext
            value={{
                heroViewMode,
                setHeroViewMode
            }}
        >
            {children}
        </FilmsContext>
    )
}

export function useFilmsPageContext() {
    const context = useContext(FilmsContext)
    if (!context) {
        throw new Error('useFilmsContext must be used within a FilmsProvider')
    }
    return context
}
