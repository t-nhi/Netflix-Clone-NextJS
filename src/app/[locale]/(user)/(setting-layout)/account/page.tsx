import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Bell, ChevronRight, Lock } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

type AccountItem = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    label: string
    href: string
}

export default async function AccountPage() {
    const t = await getTranslations('AccountPage')
    const accountItems: AccountItem[] = [
        {
            icon: Lock,
            label: t('updatePassword'),
            href: '/password'
        },
        {
            icon: Bell,
            label: t('notificationSettings'),
            href: '/notification-settings'
        }
    ]

    return (
        <div className='min-h-screen  px-6 py-8'>
            <div className='max-w-2xl mx-auto'>
                <h1 className='text-4xl font-bold mb-8'>{t('title')}</h1>
                <div className='rounded-lg overflow-hidden mb-6 border-2 border-border'>
                    {accountItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className='block border-b border-border last:border-b-0 transition-colors hover:bg-accent/50'
                            >
                                <div className='flex items-center justify-between p-6'>
                                    <div className='flex items-center gap-4'>
                                        <Icon className='w-6 h-6 ' />
                                        <span className='text-lg font-medium'>{item.label}</span>
                                    </div>
                                    <ChevronRight className='w-5 h-5 text-gray-400' />
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <Link href='/signup'>
                    <Button className='w-full dark:bg-brand hover:dark:bg-brand/90 bg-black hover:bg-black/90  text-white py-6 text-lg font-semibold rounded-xs cursor-pointer'>
                        {t('startMembership')}
                    </Button>
                </Link>
            </div>
        </div>
    )
}
