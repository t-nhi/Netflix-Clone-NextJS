"'use client'"

import Logo from '@/components/icons/logo'
import SelectLanguage from '@/components/locale-switcher-select'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface HeaderProps {
    className?: string
    buttonClassName?: string
}

export default function Header({ className, buttonClassName }: HeaderProps) {
    const t = useTranslations('Header')

    return (
        <header
            className={cn('px-6 md:px-8 lg:px-37 bg-transparent  flex items-center justify-between py-4', className)}
        >
            <Link href='/'>
                <Logo className='lg:h-[40px] lg:w-[148px] w-[89px] h-[24px]' />
            </Link>
            <div className='flex items-center gap-4 '>
                <ModeToggle className={cn('hidden md:flex', buttonClassName)} />
                <SelectLanguage className={cn('hidden md:flex', buttonClassName)} />
                <Link href='/login'>
                    <Button className={cn('text-sm bg-brand  hover:bg-brand/80 text-white  rounded-sm cursor-pointer')}>
                        {t('signIn')}
                    </Button>
                </Link>
            </div>
        </header>
    )
}
