import ForgotPasswordForm from '@/app/[locale]/(auth)/forgotPassword/_components/forgot-password-form'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Forgot Password',
    description: 'Reset your Netflix password'
}

export default function ForgotPasswordPage() {
    return (
        <div
            className='relative min-h-screen flex flex-col justify-between bg-center'
            style={{
                backgroundImage: "url('/images/forgot-password/forgot-password-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                minHeight: 'screen'
            }}
        >
            <div className='relative z-10 flex flex-col'>
                <div className='bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.7889)_8.333%,rgba(0,0,0,0.7556)_16.67%,rgba(0,0,0,0.7)_25%,rgba(0,0,0,0.6222)_33.33%,rgba(0,0,0,0.5222)_41.67%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.2778)_58.33%,rgba(0,0,0,0.1778)_66.67%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.04444)_83.33%,rgba(0,0,0,0.01111)_91.67%,rgba(0,0,0,0)_100%)] relative  z-2'>
                    <Header buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white ' />
                </div>
                <main className='flex-grow min-h-screen items-center flex justify-center sm:p-4 md:p-6 lg:p-6 xl:p-8 relative overflow-hidden w-full -mt-10 sm:-mt-12 md:-mt-16 xl:-mt-12'>
                    <div className='p-4 sm:p-6 md:p-6 lg:p-6 xl:p-8 rounded-[5px] shadow-lg w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg corner'>
                        <ForgotPasswordForm />
                    </div>
                </main>

                <Footer className='dark:bg-black bg-white' />
            </div>
        </div>
    )
}
