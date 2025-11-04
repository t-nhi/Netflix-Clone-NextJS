import ScrollToTopButton from '@/components/scroll-to-top'
import FavoriteManager from '@/app/[locale]/(user)/(user-layout)/favorite/_components/favorite-manager'

export default function FavoritePage() {
    return (
        <div className='mx-auto w-full min-h-screen'>
            <FavoriteManager />
            <ScrollToTopButton />
        </div>
    )
}
