'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import DesktopPlanLayout from './desktop-plan-layout'
import TabletPlanLayout from './tablet-plan-layout'

export default function PlanSelector() {
    const t = useTranslations('PlanformPage')
    const [selectedPlan, setSelectedPlan] = useState('premium')

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId)
    }

    const handleContinue = () => {
        console.log('Selected plan:', selectedPlan)
    }

    return (
        <>
            <DesktopPlanLayout selectedPlan={selectedPlan} onPlanSelect={handlePlanSelect} />

            <TabletPlanLayout selectedPlan={selectedPlan} onPlanSelect={handlePlanSelect} />

            <div className='max-w-4xl mb-4 text-left space-y-2 text-gray-600 text-sm leading-relaxed'>
                <p>{t('disclaimer.hdAvailability')}</p>
                <p>{t('disclaimer.deviceLimits')}</p>
                <p>{t('disclaimer.liveEvents')}</p>
            </div>

            <div className='flex justify-center mb-8'>
                <Button
                    onClick={handleContinue}
                    className='bg-red-600 hover:bg-red-700 text-white px-30 py-6 text-lg font-medium rounded-sm min-w-[200px]'
                >
                    {t('continueButton')}
                </Button>
            </div>
        </>
    )
}
