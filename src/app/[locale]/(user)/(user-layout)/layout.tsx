import Footer from '@/components/footer'
import Header from '@/components/header'

interface UserLayoutProps {
    children: React.ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
    return (
        <>
            <Header className='border-b-[0.3px] dark:border-white/10 border-black/10' />
            <main>{children}</main>
            <Footer className='px-6 md:px-8 lg:px-14 border-t-[0.3px] dark:border-white/10 border-black/10' />
        </>
    )
}
