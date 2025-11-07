import ResetPasswordForm from '@/app/[locale]/(auth)/reset-password/reset-password-form'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { getTranslations } from 'next-intl/server'

export const metadata = {
    title: 'Reset Password',
    description: 'Reset your Netflix password'
}

export default async function ResetPasswordPage() {
    const resetPasswordT = await getTranslations('ResetPasswordPage')
    return (
        <div
            className='relative flex flex-col justify-between bg-center min-h-screen'
            style={{
                backgroundImage: "url('/images/forgot-password/forgot-password-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                minHeight: 'screen'
            }}
        >
            <div className='relative z-10 flex flex-col w-full'>
                <div className='bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.7889)_8.333%,rgba(0,0,0,0.7556)_16.67%,rgba(0,0,0,0.7)_25%,rgba(0,0,0,0.6222)_33.33%,rgba(0,0,0,0.5222)_41.67%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.2778)_58.33%,rgba(0,0,0,0.1778)_66.67%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.04444)_83.33%,rgba(0,0,0,0.01111)_91.67%,rgba(0,0,0,0)_100%)] relative  z-2'>
                    <Header buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white ' />
                </div>
                <main className='grow flex min-h-screen items-center rounded-none justify-center sm:p-4 md:p-6 lg:p-6 xl:p-8 relative overflow-hidden max-w-screen -mt-4 sm:-mt-6 md:-mt-8 w-full'>
                    <div className='p-4 sm:p-6 md:p-6 lg:p-6 xl:p-8 rounded-none shadow-lg max-w-full md:max-w-[80%] lg:max-w-xl  w-full'>
                        <div className='flex flex-col gap-4 p-4 sm:p-6 md:p-8 rounded-none bg-[#f2f2f2] dark:bg-neutral-700/50'>
                            <h1 className='text-2xl sm:text-3xl text-black dark:text-white font-semibold mb-0.5 '>
                                {resetPasswordT('title')}
                            </h1>
                            <p className='text-sm sm:text-base md:text-lg text-muted-foreground mb-2'>
                                {resetPasswordT('description')}
                            </p>
                            <ResetPasswordForm />
                        </div>
                    </div>
                </main>

                <Footer className='dark:bg-black bg-white' />
            </div>
        </div>
    )
}
