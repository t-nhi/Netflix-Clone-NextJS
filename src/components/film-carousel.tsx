import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface FilmCarouselProps {
    children?: React.ReactNode
}

export default function FilmCarousel({ children }: FilmCarouselProps) {
    return (
        <div className='px-6 md:px-8 lg:px-14'>
            <Carousel
                className='w-full'
                opts={{
                    containScroll: 'keepSnaps',
                    align: 'start',
                    slidesToScroll: 'auto'
                }}
            >
                <CarouselContent className='gap-2! select-none'>{children}</CarouselContent>

                <CarouselPrevious
                    className=' left-0 -translate-x-full
             p-0! cursor-pointer flex justify-center items-center
             h-full! w-6 md:w-8 lg:w-14
             transition-all duration-300 ease-in-out border-none rounded-none
             [&_svg]:size-6! lg:[&_svg]:size-10!
             [&_svg]:text-muted-foreground hover:[&_svg]:text-white
             bg-[#141414]!'
                />

                <CarouselNext
                    className=' right-0 translate-x-full
             p-0! cursor-pointer flex justify-center items-center
             h-full! w-6 md:w-8 lg:w-14
             transition-all duration-300 ease-in-out border-none rounded-none
             [&_svg]:size-6! lg:[&_svg]:size-10!
             [&_svg]:text-muted-foreground hover:[&_svg]:text-white
             bg-[#141414]!'
                />
            </Carousel>
        </div>
    )
}
