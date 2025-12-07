'use client'

import Logo from '@/components/icons/logo'
import SelectLanguage from '@/components/locale-switcher-select'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ChevronDown, LoaderCircle, LogOut, UserCog } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Role } from '@/constants/role.enum'
import { UserSummaryType } from '@/types/dtos/customer/user.dto'
import { headerMenuItems } from './header.config'
import { AdminPaths } from '@/config/routes.config'
import MovieSearchBox from '@/components/header/search-trigger'

interface DesktopHeaderProps {
    wrapperClassName?: string
    buttonClassName?: string
    menuItemClassName?: string
    userHue?: number
    currentUserRole: null | Role
    currentPathname?: string
    onLogout?: () => Promise<void>
    isLogoutLoading?: boolean
    userData: UserSummaryType | null
}

export default function DesktopHeader({
    wrapperClassName,
    buttonClassName,
    menuItemClassName,
    userHue,
    userData,
    currentUserRole,
    currentPathname = '',
    onLogout,
    isLogoutLoading = false
}: DesktopHeaderProps) {
    const t = useTranslations('Header')

    return (
        <header
            className={cn(
                'px-6 md:px-8 lg:px-37 bg-transparent  flex items-center justify-between py-4',
                wrapperClassName
            )}
        >
            <div className='flex items-center gap-4'>
                <Link href='/'>
                    <Logo className='lg:h-10 lg:w-[148px] w-[89px] h-6' />
                </Link>
                {headerMenuItems.map((Item) => {
                    if (Item.isAuthPath && currentUserRole == null) return null
                    if (Array.isArray(Item.forRole) && currentUserRole && !Item.forRole.includes(currentUserRole))
                        return null
                    const isActive = currentPathname.includes(Item.href)
                    return (
                        <Link
                            key={Item.href}
                            href={Item.href}
                            className={cn(
                                'hover:[text-shadow:1px_0_var(--tw-color-brand),-1px_0_var(--tw-color-brand),0_1px_var(--tw-color-brand),0_-1px_var(--tw-color-brand)] transition-all duration-300 hover:text-brand ml-4 hidden md:flex gap-2 items-center [&>svg]:size-4 ',
                                {
                                    '[text-shadow:1px_0_var(--tw-color-brand),-1px_0_var(--tw-color-brand),0_1px_var(--tw-color-brand),0_-1px_var(--tw-color-brand)] text-brand ':
                                        isActive
                                },
                                menuItemClassName
                            )}
                        >
                            {isActive ? <Item.activeIcon /> : <Item.icon />} {Item.title}
                        </Link>
                    )
                })}
            </div>

            <div className='flex items-center gap-4 '>
                <MovieSearchBox className={cn('hidden md:flex', buttonClassName)} />
                <ModeToggle className={cn('hidden md:flex', buttonClassName)} />
                <SelectLanguage className={cn('hidden md:flex', buttonClassName)} />
                {currentUserRole != null && userData ? (
                    <Popover>
                        <PopoverTrigger>
                            <div className='bg-transparent flex items-center gap-2 focus:outline-none hover:cursor-pointer'>
                                {currentUserRole == Role.ADMIN ? (
                                    <Image
                                        src='/images/common/avatar_admin.png'
                                        width={40}
                                        height={40}
                                        alt={userData.first_name + ' ' + userData.last_name}
                                        className='lg:h-10 h-6 lg:w-10 w-6 '
                                        style={{
                                            filter: `hue-rotate(${userHue}deg)`
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src='/images/common/avatar_user.png'
                                        width={40}
                                        height={40}
                                        alt={userData.first_name + ' ' + userData.last_name}
                                        className='lg:h-10 h-6 lg:w-10 w-6 '
                                        style={{
                                            filter: `hue-rotate(${userHue}deg)`
                                        }}
                                    />
                                )}

                                <ChevronDown className='text-white lg:size-4 size-3 ' />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className='w-48 p-2!' align='end'>
                            <div className='flex flex-col gap-2'>
                                {currentUserRole === Role.USER && (
                                    <Link href='/account' className='block w-full'>
                                        <Button variant={'ghost'} className='justify-start w-full hover:cursor-pointer'>
                                            <UserCog />
                                            Settings
                                        </Button>
                                    </Link>
                                )}
                                {currentUserRole === Role.ADMIN && (
                                    <Link href={AdminPaths.DASHBOARD} className='block w-full'>
                                        <Button variant={'ghost'} className='justify-start w-full hover:cursor-pointer'>
                                            <UserCog />
                                            Admin Dashboard
                                        </Button>
                                    </Link>
                                )}
                                <Button
                                    variant={'ghost'}
                                    className='justify-start hover:cursor-pointer'
                                    onClick={onLogout}
                                    disabled={isLogoutLoading}
                                >
                                    {isLogoutLoading ? <LoaderCircle className='animate-spin ' /> : <LogOut />}
                                    Logout
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    !currentPathname.includes('/login') && (
                        <Link href='/login'>
                            <Button
                                className={cn(
                                    'text-sm bg-brand  hover:bg-brand/80 text-white  rounded-sm cursor-pointer'
                                )}
                            >
                                {t('signIn')}
                            </Button>
                        </Link>
                    )
                )}
            </div>
        </header>
    )
}
