import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
    const t = useTranslations('SignupPage')

    return (
        <div className='min-h-screen  flex flex-col items-center px-4 py-8'>
            <div className='w-full max-w-md'>
                <div className='flex justify-center mb-8'>
                    <Image src='/images/signup/Checkmark.png' alt='Netflix Icon' width={64} height={64} />
                </div>

                <div className='text-center mb-2'>
                    <span className='text-sm font-medium'>{t('stepIndicator', { step: 1, total: 3 })}</span>
                </div>

                <h1 className='text-2xl md:text-3xl font-bold  text-center mb-8'>{t('title')}</h1>

                <div className='space-y-4 mb-12'>
                    <div className='flex items-start gap-3'>
                        <div className='flex-shrink-0 w-6 h-6 mt-0.5'>
                            <Check className='w-6 h-6 text-brand' strokeWidth={2.5} />
                        </div>
                        <p className=' text-lg leading-relaxed'>{t('features.noCommitments')}</p>
                    </div>

                    <div className='flex items-start gap-3'>
                        <div className='flex-shrink-0 w-6 h-6 mt-0.5'>
                            <Check className='w-6 h-6 text-brand' strokeWidth={2.5} />
                        </div>
                        <p className=' text-lg leading-relaxed'>{t('features.lowPriceOnly')}</p>
                    </div>

                    <div className='flex items-start gap-3'>
                        <div className='flex-shrink-0 w-6 h-6 mt-0.5'>
                            <Check className='w-6 h-6 text-brand' strokeWidth={2.5} />
                        </div>
                        <p className=' text-lg leading-relaxed'>{t('features.noAds')}</p>
                    </div>
                </div>

                <Link href='/pricing' className='block w-full'>
                    <Button className='w-full bg-brand hover:bg-brand/90 text-white font-semibold py-4 px-6 rounded text-lg h-auto'>
                        {t('nextButton')}
                    </Button>
                </Link>
            </div>
        </div>
    )
}
