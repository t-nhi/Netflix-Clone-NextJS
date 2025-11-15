'use client'

import Link from 'next/link'
import {
    LayoutDashboard,
    Users,
    PackageCheck,
    Film,
    ShoppingCart,
    User,
    TrendingUp,
    Bell,
    Settings,
    Upload,
    Package,
    UserCog,
    LoaderCircle,
    LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/icons/logo'
import { Avatar, AvatarImage } from '@/components/ui/avatar-admin'
import { ModeToggle } from '@/components/mode-toggle'
import SelectLanguage from '@/components/locale-switcher-select'
import { AdminPaths } from '@/config/routes.config'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useAppSelector } from '@/store/hooks'
import { useMemo } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/data/useAuth'

interface AdminSideboardProps {
    className?: string
    buttonClassName?: string
}

const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: AdminPaths.DASHBOARD },
    { label: 'Users', icon: Users, href: AdminPaths.USERS },
    { label: 'Services', icon: PackageCheck, href: AdminPaths.SERVICES },
    { label: 'Movies', icon: Film, href: AdminPaths.MOVIES },
    { label: 'Purchases', icon: ShoppingCart, href: AdminPaths.PURCHASES },
    { label: 'Categories', icon: Package, href: AdminPaths.CATEGORIES },
    { label: 'Director', icon: UserCog, href: AdminPaths.DIRECTORS },
    { label: 'Actors', icon: User, href: AdminPaths.ACTORS },
    { label: 'Top Contents', icon: TrendingUp, href: AdminPaths.TOP_CONTENTS },
    { label: 'Notifications', icon: Bell, href: AdminPaths.NOTIFICATIONS }
]

const bottomMenuItems = [{ label: 'Settings', icon: Settings, href: AdminPaths.SETTINGS }]

export default function AdminSideboard({ className, buttonClassName }: AdminSideboardProps) {
    const pathname = usePathname()
    const router = useRouter()
    const { handleLogout, logoutResult } = useLogout()

    const userProfile = useAppSelector((state) => state.auth.user_profile)
    const nameUser = useMemo(
        () =>
            userProfile?.first_name && userProfile?.last_name
                ? userProfile?.first_name + ' ' + userProfile?.last_name
                : 'Admin',
        [userProfile]
    )

    const onLogout = async () => {
        if (!userProfile) return
        try {
            await handleLogout()
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            router.refresh()
        }
    }

    return (
        <div className='flex h-screen bg-gray-50 overflow-hidden'>
            <aside
                className={cn('fixed left-0 top-0 h-screen w-60 bg-black text-white flex flex-col justify-start z-30')}
            >
                <div className='flex items-center justify-center pt-4 pb-6'>
                    <Link href='/admin'>
                        <Logo className='lg:h-10 lg:w-[148px] w-[89px] h-6 cursor-pointer' />
                    </Link>
                </div>
                <div
                    className={cn(
                        'overflow-y-auto',
                        '[&::-webkit-scrollbar]:hidden',
                        'scrollbar-width-none',
                        '-ms-overflow-style-none'
                    )}
                >
                    <div className='pb-6'>
                        <div className='px-4 mb-4'>
                            <Link
                                href='/admin/movies/add'
                                className='w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors'
                            >
                                <Upload className='h-4 w-4' /> Upload
                            </Link>
                        </div>
                        <nav className='flex flex-col gap-1 px-4'>
                            <div className='px-4 text-gray-400 text-xs mt-4'>Manage</div>
                            {menuItems.map(({ label, icon: Icon, href }) => (
                                <Link key={label} href={href}>
                                    <div
                                        className={cn(
                                            'flex items-center gap-3 px-5 py-2 text-sm rounded-md cursor-pointer transition-all border',
                                            pathname.startsWith(href)
                                                ? 'bg-[#d9d9d9]/19 text-white border-[#d7d7d7]'
                                                : 'text-gray-300 border-transparent hover:bg-[#d9d9d9]/19 hover:border-[#d7d7d7] hover:text-white'
                                        )}
                                    >
                                        <Icon className='h-4 w-4' />
                                        {label}
                                    </div>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className='px-4 mb-6'>
                        <nav className='flex flex-col gap-1'>
                            <div className='text-gray-400 text-xs mb-2 px-4'>Support</div>
                            {bottomMenuItems.map(({ label, icon: Icon, href }) => (
                                <Link key={label} href={href}>
                                    <div
                                        className={cn(
                                            'flex items-center gap-3 px-5 py-2 text-sm rounded-md cursor-pointer transition-all border',
                                            pathname.startsWith(href)
                                                ? 'bg-[#d9d9d9]/19 text-white border-[#d7d7d7]'
                                                : 'text-gray-300 border-transparent hover:bg-[#d9d9d9]/19 hover:border-[#d7d7d7] hover:text-white'
                                        )}
                                    >
                                        <Icon className='h-4 w-4' />
                                        {label}
                                    </div>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </aside>

            <div className='flex flex-col flex-1 h-screen'>
                <header
                    className={cn(
                        'fixed left-60 max-w-full top-0 right-0 h-16 px-6 md:px-8 bg-black flex items-center py-4 border-b border-gray-800 z-40',
                        className
                    )}
                >
                    <div className='ml-auto flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <ModeToggle className={cn('hidden md:flex', buttonClassName)} />
                            <SelectLanguage className={cn('hidden md:flex', buttonClassName)} />
                            <Popover>
                                <PopoverTrigger>
                                    <div className='flex items-center gap-3 cursor-pointer p-1 '>
                                        <div className='text-sm text-right'>
                                            <p className='font-medium text-white'>{nameUser}</p>
                                            <p className='text-gray-400 text-xs'>{userProfile?.email || 'Admin'}</p>
                                        </div>
                                        <Avatar className='h-8 w-8'>
                                            <AvatarImage
                                                src='/images/common/avatar_admin.png'
                                                alt={userProfile?.email}
                                            />
                                        </Avatar>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='w-48 p-2!' align='end'>
                                    <div className='flex flex-col gap-2'>
                                        <Link href={AdminPaths.SETTINGS} className='block w-full'>
                                            <Button
                                                variant={'ghost'}
                                                className='justify-start w-full hover:cursor-pointer'
                                            >
                                                <UserCog />
                                                Setting
                                            </Button>
                                        </Link>
                                        <Button
                                            variant={'ghost'}
                                            className='justify-start hover:cursor-pointer'
                                            onClick={onLogout}
                                            disabled={logoutResult.isLoading}
                                        >
                                            {logoutResult.isLoading ? (
                                                <LoaderCircle className='animate-spin ' />
                                            ) : (
                                                <LogOut />
                                            )}
                                            Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
