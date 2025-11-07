import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockSubscriptionPlans } from '../_mock'

interface TabletPlanLayoutProps {
    selectedPlan: string
    onPlanSelect: (planId: string) => void
}

export default function TabletPlanLayout({ selectedPlan, onPlanSelect }: TabletPlanLayoutProps) {
    const t = useTranslations('PlanformPage')

    return (
        <div className='xl:hidden'>
            <div className='grid grid-cols-4 gap-2 sm:gap-3 mb-8'>
                {mockSubscriptionPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className={cn(
                            'relative rounded-lg cursor-pointer transition-all duration-200 min-h-[107px] p-4',
                            {
                                ' [background:radial-gradient(140.76%_131.96%_at_100%_100%,rgb(109,59,227)_0%,rgba(74,42,150,0.5)_73.57%,rgba(74,42,150,0)_100%),rgb(29,82,157)] shadow-lg':
                                    selectedPlan === plan.id,
                                'rounded-tl-none rounded-tr-none': plan.isPopular,
                                'border-2 border-gray-200': selectedPlan !== plan.id
                            }
                        )}
                        onClick={() => onPlanSelect(plan.id)}
                    >
                        {plan.isPopular && (
                            <div className='absolute -top-7 left-1/2  w-[101%]   border-brand transform -translate-x-1/2 bg-brand text-white text-xs px-5 py-2  font-medium shadow-lg z-10 rounded-tl-xl rounded-tr-xl text-center'>
                                {t('mostPopular')}
                            </div>
                        )}

                        <div
                            className={cn('relative ', {
                                ' text-white': selectedPlan === plan.id,
                                ' text-gray-700 ': selectedPlan !== plan.id
                            })}
                        >
                            <h3 className='font-medium text-sm sm:text-base  leading-tight mb-1'>{plan.name}</h3>
                            <p className='text-xs opacity-90 '>{plan.quality}</p>
                        </div>
                        {selectedPlan === plan.id && (
                            <div className='absolute bottom-2 right-2 bg-white  rounded-full p-1'>
                                <Check className='w-3 h-3 text-blue-600' />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedPlan && (
                <div className=' mb-8'>
                    {(() => {
                        const plan = mockSubscriptionPlans.find((p) => p.id === selectedPlan)
                        if (!plan) return null

                        return (
                            <div className='divide-y divide-gray-100'>
                                <div className='p-4 flex justify-between items-center'>
                                    <span className='text-gray-600'>{t('features.monthlyPrice')}</span>
                                    <span className='font-semibold text-lg text-right'>{plan.price}</span>
                                </div>

                                <div className='p-4 flex justify-between items-center'>
                                    <span className='text-gray-600'>{t('features.videoAudioQuality')}</span>
                                    <span className='font-medium text-right'>{plan.features.videoQuality}</span>
                                </div>

                                <div className='p-4 flex justify-between items-center'>
                                    <span className='text-gray-600'>{t('features.resolution')}</span>
                                    <span className='font-medium text-right'>{plan.features.resolution}</span>
                                </div>

                                <div className='p-4 flex justify-between items-start'>
                                    <span className='text-gray-600 shrink-0 mr-4'>
                                        {t('features.supportedDevices')}
                                    </span>
                                    <span className='font-medium text-right'>{plan.features.supportedDevices}</span>
                                </div>

                                <div className='p-4 flex justify-between items-center'>
                                    <span className='text-gray-600'>{t('features.householdDevices')}</span>
                                    <span className='font-medium text-right'>{plan.features.householdDevices}</span>
                                </div>

                                <div className='p-4 flex justify-between items-center'>
                                    <span className='text-gray-600'>{t('features.downloads')}</span>
                                    <span className='font-medium text-right'>{plan.features.downloads}</span>
                                </div>
                            </div>
                        )
                    })()}
                </div>
            )}
        </div>
    )
}
