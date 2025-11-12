import { getMockFilmsWithRank } from '@/_mock'
import FAQSection from '@/app/[locale]/home/_components/FAQ-section'
import { FeaturesSection } from '@/app/[locale]/home/_components/features-section'
import TrendingSection from '@/app/[locale]/home/_components/trending-section'
import Header from '@/components/header'
import SignupView from './_components/signup-view'
import { getTranslations } from 'next-intl/server'

export const metadata = {
    title: 'Home',
    description: "Welcome to Netflix, the world's leading streaming entertainment service."
}

export default async function HomePage() {
    const trendingItems = getMockFilmsWithRank(10)
    const t = await getTranslations('HomePage')

    return (
        <div>
            <div
                style={{
                    backgroundImage: 'url("/images/home/hero-background.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100%'
                }}
                className='relative flex flex-col'
            >
                <div className='absolute inset-0 bg-black opacity-75  z-1' />
                <div className='bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.7889)_8.333%,rgba(0,0,0,0.7556)_16.67%,rgba(0,0,0,0.7)_25%,rgba(0,0,0,0.6222)_33.33%,rgba(0,0,0,0.5222)_41.67%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.2778)_58.33%,rgba(0,0,0,0.1778)_66.67%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.04444)_83.33%,rgba(0,0,0,0.01111)_91.67%,rgba(0,0,0,0)_100%)] relative  z-2'>
                    <Header
                        buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white '
                        className='text-white'
                    />
                </div>
                <div className='relative z-2 flex-1 flex flex-col '>
                    <div className='m-auto text-center text-white  max-w-xl px-8'>
                        <h1 className='text-3xl lg:text-6xl  md:text-4xl font-bold mb-5'>{t('heroTitle')}</h1>
                        <p className='text-base md:text-2xl font-normal mb-8'>{t('heroSubtitle')}</p>
                        <SignupView />
                    </div>

                    <div className=' overflow-hidden h-15 relative'>
                        <div className='h-25 w-[130vw] relative top-0 left-1/2 -translate-x-1/2 pt-1 '>
                            <div className='bg-[linear-gradient(to_right,rgba(33,13,22,1)_16%,rgba(184,40,105,1),rgba(229,9,20,1),rgba(184,40,105,1),rgba(33,13,22,1)_84%)] h-full absolute inset-0 -z-1 rounded-tl-[50%_100%] rounded-tr-[50%_100%]  ' />
                            <div className='h-full bg-[radial-gradient(50%_500%_at_50%_-420%,rgba(64,97,231,0.4)_80%,rgba(0,0,0,0.1)_100%)] bg-[oklch(0.145_0_0)] rounded-tl-[50%_100%] rounded-tr-[50%_100%] ' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-6 py-4 md:px-8 lg:px-37'>
                <section className='mb-16'>
                    <h2 className='text-2xl font-bold mb-4'>{t('trendingTitle')}</h2>
                    <TrendingSection trendingItems={trendingItems} />
                </section>
                <section className='mb-16'>
                    <h2 className='text-2xl font-bold mb-4'>{t('moreReasonsTitle')}</h2>
                    <FeaturesSection />
                </section>
                <section className='mb-16'>
                    <h2 className='text-2xl font-bold mb-4'>{t('faqTitle')}</h2>
                    <FAQSection />
                </section>
            </div>
        </div>
    )
}
