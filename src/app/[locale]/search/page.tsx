import Header from '@/components/header'
import SearchManager from '@/app/[locale]/search/_components/search-manager'
import Footer from '@/components/footer'

export default function SearchPage() {
    return (
        <div className='mx-auto w-full min-h-screen'>
            <div className='relative border-b border-white/10 z-50'>
                <Header
                    buttonClassName='text-black dark:text-white bg-transparent hover:bg-transparent hover:text-black dark:hover:text-white '
                    className='text-white'
                />
            </div>
            <SearchManager />
            <Footer className='border-t border-white/10' />
        </div>
    )
}
