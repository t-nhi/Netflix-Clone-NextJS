import { getTranslations } from 'next-intl/server'
import VerifyEmailForm from './verify-email-form'

export default async function VerifyEmailPage() {
    const t = await getTranslations('VerifyEmailPage')

    return (
        <div className='min-h-screen '>
            <div className='max-w-md mx-auto px-6 py-12'>
                <h1 className='text-3xl font-semibold mb-1'>{t('title')}</h1>

                <p className=' mb-8 text-muted-foreground'>{t('description')}</p>
                <VerifyEmailForm />
            </div>
        </div>
    )
}
