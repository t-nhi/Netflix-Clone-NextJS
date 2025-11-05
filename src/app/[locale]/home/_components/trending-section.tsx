'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useState } from 'react'
import MoviePreviewModal from './movie-preview-modal'
import { MovieType } from '@/types/models/movie.model'

interface TrendingSectionProps {
    trendingItems: MovieType[]
}

export default function TrendingSection({ trendingItems }: TrendingSectionProps) {
    const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)

    const handleCardClick = (movie: MovieType) => {
        setSelectedMovie(movie)
    }

    const handleCloseModal = () => {
        setSelectedMovie(null)
    }

    return (
        <div>
            <Carousel
                className='w-[calc(100%-24px-24px)] mx-auto'
                opts={{ containScroll: 'keepSnaps', align: 'start', slidesToScroll: 'auto' }}
            >
                <CarouselContent className='gap-1!'>
                    {trendingItems.map((item) => (
                        <CarouselItem key={item.id} className='max-w-fit!'>
                            <TrendingCard item={item} onClick={() => handleCardClick(item)} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='  h-[120px] w-[24px]  [&_svg]:size-6! bg-muted! border-none' />
                <CarouselNext className='  h-[120px] w-[24px] [&_svg]:size-6! bg-muted! border-none' />
            </Carousel>
            <MoviePreviewModal movie={selectedMovie} onClose={handleCloseModal} />
        </div>
    )
}

function TrendingCard({ item, onClick }: { item: MovieType; onClick: () => void }) {
    return (
        <article
            className='relative cursor-pointer py-2  px-[10px]  md:px-[22px] w-[132px] h-[166px] md:w-[184px] md:h-[208px] xl:w-[224px] xl:h-[268px] hover:scale-102 transition-transform duration-300'
            onClick={onClick}
        >
            <div
                className='w-full h-full rounded-md overflow-hidden bg-cover bg-center'
                style={{ backgroundImage: `url(${item.vertical_poster})` }}
            />
            <div
                className='absolute z-1  bottom-5 -left-1 text-6xl md:text-7xl xl:text-8xl font-black leading-none select-none
             text-white dark:text-black
             before:content-[attr(data-content)] before:absolute before:inset-0
             before:[-webkit-text-fill-color:black] before:[-webkit-text-stroke:4px_black] 
             dark:before:[-webkit-text-fill-color:white] dark:before:[-webkit-text-stroke:4px_white]
             before:z-[-1]'
                data-content={item.rank}
            >
                {item.rank}
            </div>
        </article>
    )
}
