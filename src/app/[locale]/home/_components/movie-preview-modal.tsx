import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'
import { FilmDetailType } from '@/types/film.type'

interface MoviePreviewModalProps {
    movie: FilmDetailType | null
    onClose: () => void
}

export default function MoviePreviewModal({ movie, onClose }: MoviePreviewModalProps) {
    const t = useTranslations('MovieModal')

    if (!movie) return null

    const handleGetStartedClick = () => {
        toast.info(t('featureComingSoon'))
    }

    return (
        <Dialog open={!!movie} onOpenChange={onClose}>
            <DialogContent
                className='max-w-2xl! w-full! p-0 bg-black border-none overflow-hidden border!'
                showCloseButton={false}
            >
                <DialogTitle className='sr-only'>{movie.title}</DialogTitle>

                <div>
                    <div className='relative aspect-video  w-full'>
                        <button
                            className='absolute top-4 right-4 z-20 flex items-center justify-center
             w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 text-white cursor-pointer '
                            onClick={onClose}
                        >
                            <X className='size-7' />
                        </button>
                        <Image src={movie.horizontal_poster} alt={movie.title} fill className='object-cover' />
                        <div className='absolute inset-0  bg-[linear-gradient(40deg,rgb(22,22,22)_24.16%,rgba(6,10,23,0)_56.61%),linear-gradient(0deg,rgb(22,22,22)_3.91%,rgba(6,10,23,0)_69.26%)] z-1' />
                    </div>

                    <div className='w-full bg-[rgb(22,22,22)] p-8'>
                        <div className='flex items-center gap-3 mb-4'>
                            <Badge className='bg-[rgb(65,65,65)] text-[rgba(255,255,255,0.7)]'>{movie.year}</Badge>
                            <Badge className='bg-red-600 text-[rgba(255,255,255,0.7)]'>T{movie.age}</Badge>
                            <>
                                {movie.genres.map((genre, index) => (
                                    <Badge
                                        key={`genre-${index}`}
                                        className='bg-[rgb(65,65,65)] text-[rgba(255,255,255,0.7)]'
                                    >
                                        {genre}
                                    </Badge>
                                ))}
                            </>
                        </div>

                        <p className='text-white text-lg mb-6 max-w-2xl leading-relaxed drop-shadow-md'>
                            {movie.description}
                        </p>

                        <Button
                            className='bg-brand hover:bg-brand/80  text-white px-8 py-6 text-lg font-semibold rounded-1  flex items-center gap-2 cursor-pointer w-full lg:w-auto '
                            onClick={handleGetStartedClick}
                        >
                            {t('getStarted')} <ChevronRight className='size-7' />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
