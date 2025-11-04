import Footer from '@/components/footer'
import Header from '@/components/header'

interface MainLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: 'Account'
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header className='sticky top-0 z-40 left-0 border-b bg-background' />
            <main>{children}</main>
            <Footer className='border-t bg-muted' />
        </>
    )
}
