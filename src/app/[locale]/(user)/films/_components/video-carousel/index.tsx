import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import CarouselItemContent from '@/app/[locale]/(user)/films/_components/video-carousel/carouse-iItem-content'
import Indicator from '@/app/[locale]/(user)/films/_components/video-carousel/indicator'
import { Movie } from '@/types/models/movie.model'

interface VideoCarouselProps {
    className?: string
    movies: Movie[]
}

export default function VideoCarousel({ className, movies }: VideoCarouselProps) {
    return (
        <Carousel
            className={cn('w-full relative @container', className)}
            opts={{ duration: 45, loop: true }}
            orientation='horizontal'
            draggable={false}
        >
            <CarouselContent className='-ml-2 md:-ml-4  '>
                {movies.map((movie) => (
                    <CarouselItem key={movie.id} className='pl-2 md:pl-4 basis-full'>
                        <CarouselItemContent movie={movie} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className='absolute bottom-[1%] right-6  md:right-8 lg:right-14 hidden @lg:flex flex-col items-end gap-4'>
                <Indicator
                    autoPlayInterval={5000}
                    CarouselArrowsClassName='bg-black/30 hover:bg-black/50 size-10 [&_svg]:size-6 hover:text-brand hover:border-brand'
                    dotClassName='bg-white/30 w-[12px] h-[6px]'
                    activeDotClassName='bg-white w-9 h-[6px]'
                />
            </div>
        </Carousel>
    )
}
