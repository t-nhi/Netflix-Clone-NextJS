import FilmCarousel from '@/components/film-carousel'
import MovieCard from '@/components/movie-card'
import { MovieCardHoverInfoProvider } from '@/components/movie-card-hover-info'
import { CarouselItem } from '@/components/ui/carousel'
import { getMockFilms } from '@/_mock'
import { useTranslations } from 'next-intl'
import MovieCardSimple from '@/app/[locale]/movies/details/_components/suggest/movie-card-suggest'

export default function SuggestForYou() {
    const mockMovies = getMockFilms(20)
    const t = useTranslations('FilmsPage.sections')
    return (
        <div className='pt-6'>
            <div className='px-6 md:px-8 lg:px-14'>
                <h2 className='mb-4 text-base md:text-lg lg:text-xl font-semibold'>{t('matchedToYou')}</h2>
            </div>
            <FilmCarousel>
                {mockMovies.map((item) => (
                    <CarouselItem key={item.id} className='max-w-fit! p-0!'>
                        <MovieCardSimple movie={item} />
                    </CarouselItem>
                ))}
            </FilmCarousel>
        </div>
    )
}
