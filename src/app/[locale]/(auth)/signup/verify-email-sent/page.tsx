import EmailGradientIcon from '@/components/icons/email-gradient'
import VerifyEmailInfo from './verify-email-info'
import { getTranslations } from 'next-intl/server'

export default async function VerifyEmailSentPage() {
    const t = await getTranslations('VerifyEmailSentPage')

    return (
        <div className='w-full max-w-md mx-auto'>
            <div className='flex justify-center mb-8'>
                <EmailGradientIcon width={200} height={150} />
            </div>

            <h1 className='text-2xl md:text-3xl font-bold  text-center mb-5'>{t('title')}</h1>
            <VerifyEmailInfo className='pb-12' />
        </div>
    )
}
