'use client'

import { useAppSelector } from '@/store/hooks'
import { cn } from '@/lib/utils'
import { getHueFromId } from '@/utils/color.util'
import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLogout } from '@/hooks/data/useAuth'
import HeaderMobile from './mobile-header'
import DesktopHeader from './desktop-header'

interface HeaderProps {
    className?: string
    buttonClassName?: string
    menuItemClassName?: string
}

export default function Header({ className, buttonClassName, menuItemClassName }: HeaderProps) {
    const router = useRouter()
    const pathName = usePathname()

    const { handleLogout, logoutResult } = useLogout()

    const currentUserRole = useAppSelector((state) => state.auth.role)
    const user = useAppSelector((state) => state.auth.user_profile)
    const userHue = useMemo(() => (user ? getHueFromId(user.id) : 0), [user?.id])

    const onLogout = async () => {
        if (!user) return
        try {
            await handleLogout()
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            router.refresh()
        }
    }

    return (
        <>
            <HeaderMobile
                wrapperClassName={cn('lg:hidden', className)}
                buttonClassName={buttonClassName}
                menuItemClassName={menuItemClassName}
                currentUserRole={currentUserRole}
                onLogout={onLogout}
                currentPathname={pathName}
                isLogoutLoading={logoutResult.isLoading}
            />
            <DesktopHeader
                wrapperClassName={cn('hidden lg:flex', className)}
                buttonClassName={buttonClassName}
                menuItemClassName={menuItemClassName}
                currentUserRole={currentUserRole}
                userHue={userHue}
                onLogout={onLogout}
                currentPathname={pathName}
                isLogoutLoading={logoutResult.isLoading}
                userData={user}
            />
        </>
    )
}
