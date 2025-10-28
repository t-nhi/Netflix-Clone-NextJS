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
    HelpCircle,
    Settings,
    Upload,
    Package
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Logo from '@/components/icons/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar-admin'
import { ModeToggle } from '@/components/mode-toggle'
import SelectLanguage from '@/components/locale-switcher-select'
import ArrowLeftIcon from '@/components/icons/arrow-left'

interface AdminSideboardProps {
    className?: string
    buttonClassName?: string
}

export default function AdminSideboard({ className, buttonClassName }: AdminSideboardProps) {
    const pathname = usePathname()

    const normalizedPath = pathname.replace(/^\/(vi|en|fr)\b/, '')

    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { label: 'Users', icon: Users, href: '/admin/users' },
        { label: 'Services', icon: PackageCheck, href: '/admin/services' },
        { label: 'Movies', icon: Film, href: '/admin/movies' },
        { label: 'Purchases', icon: ShoppingCart, href: '/admin/purchases' },
        { label: 'Genres', icon: Package, href: '/admin/categories' },
        { label: 'Actors', icon: User, href: '/admin/actors' },
        { label: 'Top Contents', icon: TrendingUp, href: '/admin/top-contents' },
        { label: 'Notifications', icon: Bell, href: '/admin/notifications' }
    ]

    const bottomMenuItems = [
        { label: 'Help', icon: HelpCircle, href: '/admin/help' },
        { label: 'Settings', icon: Settings, href: '/admin/settings' }
    ]

    return (
        <div className='flex h-screen bg-gray-50 overflow-hidden'>
            <aside
                className={cn('fixed left-0 top-0 h-screen w-60 bg-black text-white flex flex-col justify-start z-30')}
            >
                <div className='flex items-center justify-center pt-4 pb-6'>
                    <Link href='/admin'>
                        <Logo className='lg:h-[40px] lg:w-[148px] w-[89px] h-[24px] cursor-pointer' />
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
                            <button className='w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 cursor-pointer'>
                                <Upload className='h-4 w-4' /> Upload
                            </button>
                        </div>

                        <nav className='flex flex-col gap-1 px-4'>
                            <div className='px-4 text-gray-400 text-xs mt-4'>Manage</div>
                            {menuItems.map(({ label, icon: Icon, href }) => (
                                <Link key={label} href={href}>
                                    <div
                                        className={cn(
                                            'flex items-center gap-3 px-5 py-2 text-sm rounded-md cursor-pointer transition-all border',
                                            normalizedPath.startsWith(href)
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
                                            normalizedPath.startsWith(href)
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
                    <div className='mb-6 px-4 flex items-center gap-2'>
                        <ArrowLeftIcon
                            className='h-4 w-4 cursor-pointer text-gray-300 hover:text-white transition-colors'
                            onClick={() => window.history.back()}
                        />
                        <Link href='/' className='text-sm text-gray-300 hover:text-white truncate'>
                            Back to Netflix
                        </Link>
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
                            <div className='text-sm text-right'>
                                <p className='font-medium text-white'>Sam Wheeler</p>
                                <p className='text-gray-400 text-xs'>samwheler@example.com</p>
                            </div>
                            <Avatar className='h-8 w-8'>
                                <AvatarImage src='https://i.pravatar.cc/100?img=12' alt='User' />
                                <AvatarFallback>SW</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
