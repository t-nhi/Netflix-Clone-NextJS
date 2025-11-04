import Image from 'next/image'
import BellIcon from '@/components/icons/bell-icon'
import { getTranslations } from 'next-intl/server'
import NotificationSwitcher from './_components/notification-switcher'
import { NotificationsConfig } from '@/constants/notification-config.enum'

export default async function NotificationSettingsPage() {
    const t = await getTranslations('NotificationSettings')

    const notificationTypes = [
        {
            title: t('email'),
            email: t('emailAddress'),
            imagePath: '/images/notification-setting/email_main.png',
            isActive: true,
            type: NotificationsConfig.EMAIL
        },
        {
            title: t('pushNotifications'),
            imagePath: '/images/notification-setting/push_main.png',
            isActive: true,
            type: NotificationsConfig.PUSH
        },
        {
            title: t('textMessages'),
            imagePath: '/images/notification-setting/text_main.png',
            isActive: false,
            type: NotificationsConfig.TEXT
        }
    ]

    return (
        <div className='min-h-screen px-6 py-8 bg-accent'>
            <div className='max-w-4xl mx-auto border border-border p-6 rounded-lg shadow-2xs'>
                <div className='text-center mb-8 border-b-2 border-border pb-6'>
                    <BellIcon className='size-20 mb-4 mx-auto' />
                    <h1 className='text-4xl font-bold mb-4'>{t('title')}</h1>
                    <p className='text-base leading-relaxed'>{t('subtitle')}</p>
                </div>

                <div className='space-y-4'>
                    {notificationTypes.map((notification, index) => (
                        <div
                            key={`notifications-${index}`}
                            className='bg-card border border-border rounded-md overflow-hidden  shadow-xs'
                        >
                            <div className='flex flex-col md:flex-row'>
                                <div className='md:w-1/2'>
                                    <div className='relative h-48 md:h-56'>
                                        <Image
                                            src={notification.imagePath}
                                            alt={notification.title}
                                            fill
                                            className='object-cover'
                                            sizes='(max-width: 768px) 100vw, 50vw'
                                        />
                                    </div>
                                </div>

                                <div className='md:w-1/2 p-6 flex flex-col justify-center'>
                                    <NotificationSwitcher
                                        title={notification.title}
                                        email={notification.email}
                                        initialState={notification.isActive}
                                        type={notification.type}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
