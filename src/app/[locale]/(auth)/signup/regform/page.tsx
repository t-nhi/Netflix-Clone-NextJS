import RegisterForm from '@/app/[locale]/(auth)/signup/regform/register-form'
import { getTranslations } from 'next-intl/server'

export default async function RegformPage() {
    const t = await getTranslations('RegformPage')

    const currentStep = 2

    return (
        <div className='min-h-screen '>
            <div className='max-w-md mx-auto px-6 py-12'>
                <div className='text-xs  mb-2 uppercase tracking-wider'>
                    {t('stepIndicator', { current: currentStep, total: 3 })}
                </div>

                <h1 className='text-3xl font-semibold mb-4'>{t('title')}</h1>

                <p className=' mb-8'>{t('subtitle')}</p>
                <RegisterForm />
            </div>
        </div>
    )
}
