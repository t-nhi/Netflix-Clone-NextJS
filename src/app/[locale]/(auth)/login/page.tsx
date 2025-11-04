import Footer from '@/components/footer'
import LoginForm from './_components/loginForm'
import Header from '@/components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your Netflix account to access a world of entertainment.'
}

export default function LoginPage() {
    return (
        <div
            className='relative min-h-screen flex flex-col justify-between bg-center'
            style={{
                backgroundImage: "url('/images/home/hero-background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%'
            }}
        >
            <div className='absolute inset-0 bg-black opacity-75'></div>

            <div className='relative z-10 flex flex-col min-h-screen'>
                <div className='bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.7889)_8.333%,rgba(0,0,0,0.7556)_16.67%,rgba(0,0,0,0.7)_25%,rgba(0,0,0,0.6222)_33.33%,rgba(0,0,0,0.5222)_41.67%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.2778)_58.33%,rgba(0,0,0,0.1778)_66.67%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.04444)_83.33%,rgba(0,0,0,0.01111)_91.67%,rgba(0,0,0,0)_100%)] relative  z-2'>
                    <Header buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white ' />
                </div>
                <main className='flex-grow flex items-center justify-center sm:p-4 md:p-6 lg:p-6 xl:p-8 relative overflow-hidden w-full'>
                    <div className='p-4 sm:p-6 md:p-6 lg:p-6 xl:p-8 rounded-[5px] shadow-lg w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg corner'>
                        <LoginForm />
                    </div>
                </main>

                <Footer className='dark:bg-black bg-white' />
            </div>
        </div>
    )
}
