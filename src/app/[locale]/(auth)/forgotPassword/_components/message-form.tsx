'use client'

import { Form } from '@/components/ui/form'
import { useTranslations } from 'next-intl'

interface SuccessMessageFormProps {
    email: string
    form: any
}

export default function SuccessMessageForm({ email, form }: SuccessMessageFormProps) {
    const forgotT = useTranslations('ForgotPasswordPage')

    const emailT = email || ''
    const [username, domain] = emailT.split('@')
    const visibleChars = 2
    const masked =
        username.length > visibleChars
            ? `${username.slice(0, visibleChars)}${'*'.repeat(username.length - visibleChars)}`
            : username
    const maskedEmail = `${masked}@${domain || ''}`

    return (
        <Form {...form}>
            <form className='flex flex-col gap-4 p-4 sm:p-6 md:p-8 bg-[#f2f2f2] dark:bg-neutral-700/50'>
                <h1 className='text-2xl sm:text-3xl dark:text-white text-black font-semibold mb-4 text-center netflix-sans-bold'>
                    {forgotT('successTitle')}
                </h1>
                <p className='dark:text-white text-black text-sm sm:text-base mb-6 text-left'>
                    {forgotT.rich('successDescription', { email: maskedEmail })}
                </p>
            </form>
        </Form>
    )
}
