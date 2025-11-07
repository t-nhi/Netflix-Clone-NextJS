import { getTranslations } from 'next-intl/server'
import PlanSelector from './_components/plan-selector'

export default async function PlanFormPage() {
    const t = await getTranslations('PlanformPage')
    const currentStep = 1

    return (
        <div className='min-h-screen '>
            <div className='max-w-[1200px] mx-auto px-6 py-12'>
                <div className='text-xs text-gray-600 mb-2 uppercase tracking-wider'>
                    {t('stepIndicator', { current: currentStep, total: 3 })}
                </div>

                <h1 className='text-3xl font-semibold text-gray-900 mb-12'>{t('title')}</h1>

                <PlanSelector />
            </div>
        </div>
    )
}
