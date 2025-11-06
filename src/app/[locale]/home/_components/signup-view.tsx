'use client'

import { useAppSelector } from '@/store/hooks'
import SignupForm from './signup-form'
import { useTranslations } from 'next-intl'

export default function SignupView() {
    const user = useAppSelector((state) => state.auth.user_profile)
    const t = useTranslations('HomePage')

    if (user) return null

    return (
        <>
            <p className='text-base mb-4'>{t('heroDescription')}</p>
            <SignupForm />
        </>
    )
}
