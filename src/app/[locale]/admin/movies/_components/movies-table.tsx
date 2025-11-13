'use client'

import FilmsList from '@/app/[locale]/admin/movies/_components/movies-list'
import InputSearch from '@/components/input-search'
import ScrollToTopButton from '@/components/scroll-to-top'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function FilmsTable() {
    const t = useTranslations('AdminPage.filmsPage')
    const router = useRouter()

    const handleEdit = (id: string) => {
        router.push(`/admin/actors/edit/${encodeURIComponent(id)}`)
    }
    const handleDelete = (id: string) => {
        toast.success(t('messages.deleteSuccess'))
    }

    return (
        <div className='flex min-h-screen'>
            <main className='flex-1 p-6'>
                <div className='flex flex-row justify-end items-center mb-6 gap-4'>
                    <div className='flex flex-row gap-3 w-auto'>
                        <InputSearch placeholder={t('searchFilms')} className='w-auto' />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => router.push('/admin/movies/add')}
                                    className='rounded-full p-1 shrink-0 cursor-pointer w-8 h-8 transition-colors duration-300 border-2 border-black dark:border-white text-black dark:text-white bg-black/3 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10'
                                >
                                    <Plus className='h-4 w-4 font-bold' />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side='bottom'>{t('addFilm')}</TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <FilmsList onEdit={handleEdit} onDelete={handleDelete} />

                <ScrollToTopButton />
            </main>
        </div>
    )
}
