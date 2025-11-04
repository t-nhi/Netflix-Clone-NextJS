import ResetPasswordForm from '@/app/[locale]/(auth)/resetPassword/reset-password-form'
import Footer from '@/components/footer'
import Header from '@/components/header'

export const metadata = {
    title: 'Reset Password',
    description: 'Reset your Netflix password'
}

export default function LoginPage() {
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
                <main className='flex-grow flex min-h-screen items-center rounded-none justify-center sm:p-4 md:p-6 lg:p-6 xl:p-8 relative overflow-hidden max-w-screen -mt-4 sm:-mt-6 md:-mt-8 w-full'>
                    <div className='p-4 sm:p-6 md:p-6 lg:p-6 xl:p-8 rounded-none shadow-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl corner w-full'>
                        <ResetPasswordForm />
                    </div>
                </main>

                <Footer className='dark:bg-black bg-white' />
            </div>
        </div>
    )
}
