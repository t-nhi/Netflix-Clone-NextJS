'use client'

import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useEffect, useState } from 'react'
import { ActorType } from '@/types/actor-director.type'
import { getMockActors } from '@/app/[locale]/admin/_mock/actors.mock'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { maskId } from '@/utils/formatting/formatId'

type ActorsListProps = {
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

const imageSrc = (imageURL: string): string => {
    if (imageURL?.startsWith('/public')) return imageURL.replace('/public', '')
    return imageURL
}
export default function ActorsList({ onEdit, onDelete }: ActorsListProps) {
    const t = useTranslations('AdminPage.actorsPage')
    const [actors, setActors] = useState<ActorType[]>([])

    useEffect(() => {
        setActors(getMockActors(20))
    }, [])

    if (actors.length === 0) {
        return <div className='text-center py-12 text-gray-500'>{t('messages.emptyActor ')}</div>
    }

    return (
        <div className='rounded-lg shadow overflow-hidden w-full max-w-[1200px] mx-auto'>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm border-collapse min-w-[800px]'>
                    <thead>
                        <tr>
                            <th
                                colSpan={6}
                                className='px-4 py-4 text-lg font-semibold text-gray-800 dark:text-white border-b text-left'
                            >
                                {t('title')}
                            </th>
                        </tr>
                        <tr className='bg-gray-100 dark:bg-white/20 text-left text-gray-700 dark:text-gray-400'>
                            <th className='px-4 py-2 font-medium'>{t('id')}</th>
                            <th className='px-4 py-2 font-medium'>{t('image')}</th>
                            <th className='px-4 py-2 font-medium'>{t('name')}</th>
                            <th className='px-4 py-2 font-medium'>{t('bio')}</th>
                            <th className='px-4 py-2 font-medium'>{t('dateOfBirth')}</th>
                            <th className='px-4 py-2 font-medium text-center'>{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actors.map((actor) => {
                            const maskedId = maskId(actor.id)
                            const imagedSrc = imageSrc(actor.image || '')
                            return (
                                <tr
                                    key={actor.id}
                                    className='border-t hover:bg-gray-50 dark:hover:bg-white/10 transition-colors'
                                >
                                    <td className='px-4 py-2 text-gray-900 dark:text-white font-mono text-xs'>
                                        {maskedId}
                                    </td>
                                    <td className='px-4 py-2'>
                                        <div className='w-[80px] aspect-[3/4] relative overflow-hidden rounded-md border border-gray-200'>
                                            <Image
                                                src={imagedSrc || '/images/actor/default.png'}
                                                alt={actor.fullName}
                                                fill
                                                className='object-cover object-center'
                                            />
                                        </div>
                                    </td>

                                    <td className='px-4 py-2 font-medium'>{actor.fullName}</td>
                                    <td
                                        className='px-4 py-2 text-gray-900 dark:text-gray-300 font-mono text-xs max-w-xs truncate'
                                        title={actor.biography}
                                    >
                                        {actor.biography}
                                    </td>
                                    <td className='px-4 py-2 text-gray-600 dark:text-gray-400 font-mono text-xs'>
                                        {actor.dateOfBirth}
                                    </td>
                                    <td className='px-4 py-2'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        onClick={() => onEdit(actor.id)}
                                                        className='rounded-full cursor-pointer w-8 h-8 bg-[#f4f3f3] border border-[#dbdbdb] hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors'
                                                    >
                                                        <Pencil className='h-4 w-4 text-gray-600 dark:text-white' />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side='bottom'>{t('edit')}</TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        onClick={() => onDelete(actor.id)}
                                                        className='rounded-full cursor-pointer w-8 h-8 bg-[#f4f3f3] border border-[#dbdbdb] hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors'
                                                    >
                                                        <Trash className='h-4 w-4 text-gray-600 dark:text-white' />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side='bottom'>{t('delete')}</TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
