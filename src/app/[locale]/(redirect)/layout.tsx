import Footer from '@/components/footer'
import Header from '@/components/header'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main className='h-[calc(100vh-3.75rem-5.25rem)] flex overflow-auto'>{children}</main>
            <Footer />
        </div>
    )
}
