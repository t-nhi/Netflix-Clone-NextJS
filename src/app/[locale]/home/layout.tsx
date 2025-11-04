import Footer from '@/components/footer'

interface HomeLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: 'Account'
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <>
            <main>{children}</main>
            <Footer className='border-t ' />
        </>
    )
}
