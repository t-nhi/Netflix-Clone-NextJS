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
import { ChevronDown, Loader, LogOut, User, UserCog } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface HeaderProps {
    className?: string
    buttonClassName?: string
}

export default function Header({ className, buttonClassName }: HeaderProps) {
    const t = useTranslations('Header')

    const user = useAppSelector((state) => state.auth.user_profile)
    const userHue = user ? getHueFromId(user.id) : 0

    return (
        <header
            className={cn('px-6 md:px-8 lg:px-37 bg-transparent  flex items-center justify-between py-4', className)}
        >
            <Link href='/'>
                <Logo className='lg:h-[40px] lg:w-[148px] w-[89px] h-[24px]' />
            </Link>
            {user ? (
                <Popover>
                    <PopoverTrigger>
                        <button className='bg-transparent flex items-center gap-2 focus:outline-none hover:cursor-pointer'>
                            <Image
                                src='/images/avatar_user.png'
                                width={40}
                                height={40}
                                alt={user.first_name + ' ' + user.last_name}
                                className='lg:h-[40px] h-[24px] lg:w-[40px] w-[24px] '
                                style={{
                                    filter: `hue-rotate(${userHue}deg)`
                                }}
                            />
                            <ChevronDown className='text-white lg:size-4 size-3 ' />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className='w-48 p-2!' align='end'>
                        <div className='flex flex-col gap-2'>
                            <Link href='/account' className='block w-full'>
                                <Button variant={'ghost'} className='justify-start w-full'>
                                    <UserCog />
                                    Settings
                                </Button>
                            </Link>
                            <Button variant={'ghost'} className='justify-start'>
                                <LogOut />
                                Logout
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            ) : (
                <div className='flex items-center gap-4 '>
                    <ModeToggle className={cn('hidden md:flex', buttonClassName)} />
                    <SelectLanguage className={cn('hidden md:flex', buttonClassName)} />
                    <Link href='/login'>
                        <Button
                            className={cn('text-sm bg-brand  hover:bg-brand/80 text-white  rounded-sm cursor-pointer')}
                        >
                            {t('signIn')}
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    )
}
