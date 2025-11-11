'use client'

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useAppSelector } from '@/store/hooks'
import Logo from '../icons/logo'

export default function HeaderMobile() {
    const user = useAppSelector((state) => state.auth.user_profile)

    return (
        <header className='flex items-center justify-between p-4 bg-transparent'>
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
                        <Link href='/home'>Home</Link>
                        {user && <Link href='/account'>Account</Link>}
                        {!user && <Link href='/login'>Login</Link>}
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}
