import { Role } from '@/constants/role.enum'
import { ElementType } from 'react'
import { BiCameraMovie, BiSolidCameraMovie } from 'react-icons/bi'
import { BsArchive, BsArchiveFill, BsCollectionPlay, BsCollectionPlayFill } from 'react-icons/bs'
import { IoIosNotificationsOutline, IoMdNotifications } from 'react-icons/io'

interface HeaderMenuItemType {
    title: string
    href: string
    icon: ElementType
    activeIcon: ElementType
    forRole: Role[] | null
    isAuthPath: boolean
}

const userMenuItems: HeaderMenuItemType[] = [
    {
        title: 'Movies',
        href: '/movies',
        icon: BiCameraMovie,
        activeIcon: BiSolidCameraMovie,
        forRole: [Role.USER],
        isAuthPath: false
    },
    {
        title: 'Favorites',
        href: '/favorites',
        icon: BsCollectionPlay,
        activeIcon: BsCollectionPlayFill,
        forRole: [Role.USER],
        isAuthPath: true
    },
    {
        title: 'History',
        href: '/history',
        icon: BsArchive,
        activeIcon: BsArchiveFill,
        isAuthPath: true,
        forRole: [Role.USER]
    },
    {
        title: 'Notifications',
        href: '/notification-settings',
        icon: IoIosNotificationsOutline,
        activeIcon: IoMdNotifications,
        isAuthPath: true,
        forRole: [Role.USER]
    }
]

const adminMenuItems: HeaderMenuItemType[] = [
    {
        title: 'Admin',
        href: '/admin',
        icon: BiSolidCameraMovie,
        activeIcon: BiSolidCameraMovie,
        forRole: [Role.ADMIN],
        isAuthPath: true
    }
]

export const headerMenuItems: HeaderMenuItemType[] = [...userMenuItems, ...adminMenuItems]
