'use client'

import { SessionStorageKeys } from '@/constants/session-storage-keys.enum'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/navigation'
import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useVerifyEmailMutation } from '@/store/services/auth/auth.services'

interface VerifyEmailInfoProps {
    className?: string
}
export default function VerifyEmailInfo({ className }: VerifyEmailInfoProps) {
    const router = useRouter()
    const [email, setEmail] = useState<string | null>(null)
    const t = useTranslations('VerifyEmailSentPage')

    const [verifyEmail, { isLoading }] = useVerifyEmailMutation()

    useEffect(() => {
        const email = sessionStorage.getItem(SessionStorageKeys.SIGNUP_EMAIL)
        setEmail(email)
        if (!email) {
            router.replace('/signup')
        }
    }, [router])

    const handleResendEmailVerify = async () => {
        if (!email) return
        try {
            await verifyEmail({ email }).unwrap()
        } catch (error) {
            console.error('Error resending verification email:', error)
        }
    }

    return (
        <div className={className}>
            <p className='text-center text-lg mb-8'>{t('message', { email: email ?? '' })}</p>
            <Button
                onClick={handleResendEmailVerify}
                className='w-full bg-brand hover:bg-brand/90 text-white font-semibold py-4 px-10 rounded text-lg cursor-pointer'
            >
                {isLoading ? <LoaderCircle className='animate-spin size-5' /> : t('resendButton')}
            </Button>
        </div>
    )
}
