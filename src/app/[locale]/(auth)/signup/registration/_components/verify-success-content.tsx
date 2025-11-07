'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Laptop, Monitor, Smartphone } from 'lucide-react'
import { useRouter } from '@/i18n/navigation'

export function VerifySuccessContent() {
    const t = useTranslations('RegistrationPage')
    const router = useRouter()

    const handleNextClick = () => {
        router.push('/signup/regform')
    }

    return (
        <div className='w-full max-w-md'>
            <div className='flex justify-center items-end gap-4 mb-8'>
                <div className='text-brand'>
                    <Laptop className='w-16 h-16' strokeWidth={1.5} />
                </div>
                <div className='text-brand'>
                    <Monitor className='w-20 h-20' strokeWidth={1.5} />
                </div>
                <div className='text-brand flex flex-col items-center gap-1'>
                    <Smartphone className='w-10 h-16' strokeWidth={1.5} />
                    <div className='w-6 h-10 border-2 border-brand rounded-sm'></div>
                </div>
            </div>

            <div className='text-center mb-2'>
                <span className='text-sm font-medium '>{t('stepIndicator', { step: 2, total: 3 })}</span>
            </div>

            <h1 className='text-2xl md:text-3xl font-bold text-center mb-4'>{t('title')}</h1>

            <p className=' text-lg leading-relaxed text-center mb-12 px-2'>{t('description')}</p>

            <Button
                onClick={handleNextClick}
                className='w-full bg-brand hover:bg-brand/90 text-white font-semibold py-4 px-6 rounded text-lg cursor-pointer'
            >
                {t('nextButton')}
            </Button>
        </div>
    )
}
