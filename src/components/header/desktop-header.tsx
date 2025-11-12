'use client'

import Logo from '@/components/icons/logo'
import SelectLanguage from '@/components/locale-switcher-select'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { getHueFromId } from '@/utils/color.util'
import { ChevronDown, LoaderCircle, LogOut, UserCog } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLogout } from '@/hooks/data/useAuth'
import { headerMenuItems } from './header.config'

interface HeaderProps {
    className?: string
    buttonClassName?: string
    menuItemClassName?: string
}

export default function Header({ className, buttonClassName, menuItemClassName }: HeaderProps) {
    const t = useTranslations('Header')
    const router = useRouter()
    const pathName = usePathname()

    const isLoginPage = useMemo(() => {
        return pathName.includes('/login')
    }, [pathName])

    const { handleLogout, logoutResult } = useLogout()

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
        <header
            className={cn('px-6 md:px-8 lg:px-37 bg-transparent  flex items-center justify-between py-4', className)}
        >
            <div className='flex items-center gap-4'>
                <Link href='/'>
                    <Logo className='lg:h-10 lg:w-[148px] w-[89px] h-6' />
                </Link>
                {headerMenuItems.map((Item) => {
                    if (Item.isAuthPath && !user) return null
                    const isActive = pathName.includes(Item.href)
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
            </div>

            <div className='flex items-center gap-4 '>
                <ModeToggle className={cn('hidden md:flex', buttonClassName)} />
                <SelectLanguage className={cn('hidden md:flex', buttonClassName)} />
                {user ? (
                    <Popover>
                        <PopoverTrigger>
                            <div className='bg-transparent flex items-center gap-2 focus:outline-none hover:cursor-pointer'>
                                <Image
                                    src='/images/avatar_user.png'
                                    width={40}
                                    height={40}
                                    alt={user.first_name + ' ' + user.last_name}
                                    className='lg:h-10 h-6 lg:w-10 w-6 '
                                    style={{
                                        filter: `hue-rotate(${userHue}deg)`
                                    }}
                                />
                                <ChevronDown className='text-white lg:size-4 size-3 ' />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className='w-48 p-2!' align='end'>
                            <div className='flex flex-col gap-2'>
                                <Link href='/account' className='block w-full'>
                                    <Button variant={'ghost'} className='justify-start w-full hover:cursor-pointer'>
                                        <UserCog />
                                        Settings
                                    </Button>
                                </Link>
                                <Button
                                    variant={'ghost'}
                                    className='justify-start hover:cursor-pointer'
                                    onClick={onLogout}
                                    disabled={logoutResult.isLoading}
                                >
                                    {logoutResult.isLoading ? <LoaderCircle className='animate-spin ' /> : <LogOut />}
                                    Logout
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    !isLoginPage && (
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
