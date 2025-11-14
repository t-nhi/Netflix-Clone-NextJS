'use client'

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { LoaderCircle, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import Logo from '../icons/logo'
import { cn } from '@/lib/utils'
import { ModeToggle } from '../mode-toggle'
import SelectLanguage from '../locale-switcher-select'
import { Role } from '@/constants/role.enum'
import { headerMenuItems } from './header.config'
import { AdminPaths, UnauthPaths, UserPaths } from '@/config/routes.config'
import { DialogTitle } from '@radix-ui/react-dialog'
import { IoIosSettings } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { Separator } from '@radix-ui/react-select'

interface MobileHeaderProps {
    wrapperClassName?: string
    buttonClassName?: string
    menuItemClassName?: string
    currentPathname?: string
    onLogout?: () => Promise<void>
    isLogoutLoading?: boolean
    currentUserRole: null | Role
}

export default function MobileHeader({
    wrapperClassName,
    buttonClassName,
    menuItemClassName,
    onLogout,
    currentPathname = '',
    isLogoutLoading = false,
    currentUserRole = null
}: MobileHeaderProps) {
    return (
        <header className={cn('flex items-center justify-between p-4 bg-transparent', wrapperClassName)}>
            <Link href='/'>
                <Logo className='w-[89px] h-6' />
            </Link>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='ghost' size='icon'>
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side='right' className='w-[70%] p-4'>
                    <DialogTitle className='text-lg font-semibold'>Menu</DialogTitle>
                    <div className='flex flex-col gap-2'>
                        {headerMenuItems.map((Item) => {
                            if (Item.isAuthPath && currentUserRole == null) return null
                            if (
                                Array.isArray(Item.forRole) &&
                                currentUserRole &&
                                !Item.forRole.includes(currentUserRole)
                            )
                                return null

                            const isActive = currentPathname.includes(Item.href)

                            return (
                                <Button
                                    key={Item.href}
                                    variant='ghost'
                                    asChild
                                    className={cn(
                                        'justify-start ml-2 px-3 py-2 text-base gap-3 [&>svg]:size-6',
                                        {
                                            'text-brand [text-shadow:1px_0_var(--tw-color-brand),-1px_0_var(--tw-color-brand),0_1px_var(--tw-color-brand),0_-1px_var(--tw-color-brand)]':
                                                isActive
                                        },
                                        menuItemClassName
                                    )}
                                >
                                    <Link href={Item.href}>
                                        {isActive ? <Item.activeIcon /> : <Item.icon />} {Item.title}
                                    </Link>
                                </Button>
                            )
                        })}

                        {currentUserRole == Role.USER ? (
                            <Button
                                variant='ghost'
                                asChild
                                className={cn(
                                    'justify-start ml-2 px-3 py-2 text-base gap-3 [&>svg]:size-6',
                                    {
                                        'text-brand [text-shadow:1px_0_var(--tw-color-brand),-1px_0_var(--tw-color-brand),0_1px_var(--tw-color-brand),0_-1px_var(--tw-color-brand)]':
                                            currentPathname.includes(UserPaths.ACCOUNT)
                                    },
                                    menuItemClassName
                                )}
                            >
                                <Link href={UserPaths.ACCOUNT}>
                                    {currentPathname.includes(UserPaths.ACCOUNT) ? (
                                        <IoIosSettings />
                                    ) : (
                                        <IoSettingsOutline />
                                    )}
                                    Account
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                variant='ghost'
                                asChild
                                className={cn(
                                    'justify-start ml-2 px-3 py-2 text-base gap-3 [&>svg]:size-6',
                                    {
                                        'text-brand [text-shadow:1px_0_var(--tw-color-brand),-1px_0_var(--tw-color-brand),0_1px_var(--tw-color-brand),0_-1px_var(--tw-color-brand)]':
                                            currentPathname.includes(AdminPaths.DASHBOARD)
                                    },
                                    menuItemClassName
                                )}
                            >
                                <Link href={AdminPaths.DASHBOARD}>
                                    {currentPathname.includes(AdminPaths.DASHBOARD) ? (
                                        <IoIosSettings />
                                    ) : (
                                        <IoSettingsOutline />
                                    )}
                                    Admin Dashboard
                                </Link>
                            </Button>
                        )}

                        {currentUserRole != null && (
                            <Button
                                variant='ghost'
                                onClick={onLogout}
                                disabled={isLogoutLoading}
                                className={cn(
                                    'justify-start ml-2 px-3 py-2 text-base gap-3 [&>svg]:size-6',
                                    menuItemClassName
                                )}
                            >
                                {isLogoutLoading ? <LoaderCircle className='animate-spin' /> : <LogOut />}
                                Logout
                            </Button>
                        )}

                        {currentUserRole == null && !currentPathname.includes(UnauthPaths.LOGIN) && (
                            <Button
                                variant='ghost'
                                asChild
                                className={cn(
                                    'justify-start ml-2 px-3 py-2 text-base gap-3 [&>svg]:size-6',
                                    {
                                        'text-brand [text-shadow:1px_0_var(--tw-color-brand),-1px_0_var(--tw-color-brand),0_1px_var(--tw-color-brand),0_-1px_var(--tw-color-brand)]':
                                            currentPathname.includes(UnauthPaths.LOGIN)
                                    },
                                    menuItemClassName
                                )}
                            >
                                <Link href={UnauthPaths.LOGIN}>Login</Link>
                            </Button>
                        )}
                    </div>

                    <Separator className='my-2 border-foreground bg-red-500 ' />
                    <div className='flex items-center gap-4'>
                        <ModeToggle className={cn('flex', buttonClassName)} />
                        <SelectLanguage className={cn('flex', buttonClassName)} />
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}
