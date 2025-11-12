import { ElementType } from 'react'
import { BiCameraMovie, BiSolidCameraMovie } from 'react-icons/bi'
import { BsArchive, BsArchiveFill, BsCollectionPlay, BsCollectionPlayFill } from 'react-icons/bs'

interface HeaderMenuItemType {
    title: string
    href: string
    icon: ElementType
    activeIcon: ElementType
    isAuthPath: boolean | null
}

export const headerMenuItems: HeaderMenuItemType[] = [
    { title: 'Movies', href: '/movies', icon: BiCameraMovie, activeIcon: BiSolidCameraMovie, isAuthPath: null },
    {
        title: 'Favorites',
        href: '/favorites',
        icon: BsCollectionPlay,
        activeIcon: BsCollectionPlayFill,
        isAuthPath: true
    },
    {
        title: 'History',
        href: '/history',
        icon: BsArchive,
        activeIcon: BsArchiveFill,
        isAuthPath: true
    }
]
