'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { CircleCheck, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { NotificationType } from '@/types/common/notification-config.type'
import { NotificationsConfig } from '@/constants/notification-config.enum'

interface NotificationSwitcherProps {
    title: string
    email?: string
    initialState: boolean
    type: NotificationType
}

export default function NotificationSwitcher({ title, email, initialState, type }: NotificationSwitcherProps) {
    const [isActive, setIsActive] = useState(initialState)
    const t = useTranslations('NotificationSettings')

    const handleToggle = (checked: boolean) => {
        setIsActive(checked)
        console.log(`${type} notifications ${checked ? 'enabled' : 'disabled'}`)
    }

    const getStatusText = () => {
        return isActive ? t('statusActive', { name: title }) : t('statusInactive', { name: title })
    }

    const getToggleText = () => {
        return isActive ? t('toggleOff') : t('toggleOn')
    }

    const getDescriptionText = () => {
        switch (type) {
            case NotificationsConfig.EMAIL:
                return t('emailDescription')
            case NotificationsConfig.PUSH:
                return t('pushDescription')
            case NotificationsConfig.TEXT:
                return t('textDescription')
            default:
                return ''
        }
    }

    return (
        <TooltipProvider>
            <div className='flex flex-col space-y-4'>
                <div className='flex items-start justify-between'>
                    <div className='flex-1 pr-6'>
                        <h3 className='text-2xl font-bold mb-3'>{title}</h3>
                        {email && <p className='text-muted-foreground text-base mb-3'>{email}</p>}

                        <p className='text-muted-foreground text-sm mb-4 leading-relaxed'>{getDescriptionText()}</p>

                        <div className='flex items-center gap-3'>
                            {isActive ? (
                                <CircleCheck className='w-5 h-5 text-green-500 flex-shrink-0' />
                            ) : (
                                <XCircle className='w-5 h-5 text-red-500 flex-shrink-0' />
                            )}
                            <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                                {getStatusText()}
                            </span>
                        </div>
                    </div>

                    <div className='flex items-center pt-2'>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Switch
                                        id={`${type}-notifications`}
                                        checked={isActive}
                                        onCheckedChange={handleToggle}
                                        className='data-[state=checked]:bg-brand scale-125'
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{getToggleText()}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
