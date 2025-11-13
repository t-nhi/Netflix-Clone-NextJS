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
                    <div className='flex flex-col gap-4'>
                        {headerMenuItems.map((Item) => {
                            if (Item.isAuthPath && currentUserRole == null) return null
                            const isActive = currentPathname.includes(Item.href)
                            return (
                                <Link
                                    key={Item.href}
                                    href={Item.href}
                                    className={cn(
                                        'hover:[text-shadow:1px_0_var(--tw-color-brand),-1px_0_var(--tw-color-brand),0_1px_var(--tw-color-brand),0_-1px_var(--tw-color-brand)] transition-all duration-300 hover:text-brand ml-4 hidden md:flex gap-2 items-center ',
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
                        {currentUserRole != null && (
                            <>
                                <Link href='/account' className={menuItemClassName}>
                                    Account
                                </Link>
                                <button
                                    type='button'
                                    onClick={onLogout}
                                    className={menuItemClassName}
                                    disabled={isLogoutLoading}
                                >
                                    {isLogoutLoading ? <LoaderCircle className='animate-spin ' /> : <LogOut />}
                                    Logout
                                </button>
                            </>
                        )}

                        {currentUserRole == null && (
                            <Link href='/login' className={menuItemClassName}>
                                Login
                            </Link>
                        )}
                        <ModeToggle className={cn('hidden md:flex', buttonClassName)} />
                        <SelectLanguage className={cn('hidden md:flex', buttonClassName)} />
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}
