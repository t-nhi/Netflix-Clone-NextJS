'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import StarRating from '@/components/star-rating'
import Quit from '@/components/icons/quit'

type Props = {
    onSubmit?: (rating: number, comment: string) => void
}

export default function RatingForm({ onSubmit }: Props) {
    const t = useTranslations('RatingForm')
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const maxChars = 400

    const ratingLabels: { [key in 1 | 2 | 3 | 4 | 5]: string } = {
        1: t('rating.terrible'),
        2: t('rating.bad'),
        3: t('rating.ok'),
        4: t('rating.good'),
        5: t('rating.excellent')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (rating === 0) {
            toast.error(t('pleaseSelectRating'))
            return
        }
        if (typeof onSubmit === 'function') onSubmit(rating, comment)
        toast.success(t('ratingSuccess', { rating }))
        setRating(0)
        setComment('')
        setIsDialogOpen(false)
    }

    const handleCancel = () => {
        setRating(0)
        setComment('')
        setIsDialogOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsDialogOpen(true)}
                className='lg:w-[58%] mb-3 border-l-5 border-0 border-l-brand py-2 px-3 bg-[#ffffff]/15  hover:bg-[#ffffff]/30 cursor-pointer rounded-lg text-left transition-all duration-200 group text-gray-100 text-base'
            >
                {t('addRating')}
            </button>

            {isDialogOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 md:p-5'>
                    <form
                        onSubmit={handleSubmit}
                        className={`lg:w-[58%] w-full transition-all duration-100 bg-white/5 rounded-lg p-3 md:p-5 backdrop-blur-sm border-l-4 border-brand`}
                    >
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className='text-base font-normal text-white'>{t('yourRating')}</h3>
                            <Quit onClick={handleCancel} className='cursor-pointer' />
                        </div>

                        <div className='flex items-start gap-4 md:gap-6 mb-6'>
                            <div className='flex-1'>
                                <div className='flex flex-col items-start relative'>
                                    <div className='flex items-center gap-3 md:gap-4 relative'>
                                        <StarRating
                                            rating={rating}
                                            size={15}
                                            className='cursor-pointer transition-transform hover:scale-105'
                                            onChange={(value) => setRating(value)}
                                            onStarHover={(value) => setHoverRating(value)}
                                        />

                                        {hoverRating > 0 && (
                                            <div className='absolute bottom-[-20px] left-1/2 -translate-x-1/2 px-1 py-0.5 text-[10px] font-normal  text-white rounded whitespace-nowrap justify-end'>
                                                {ratingLabels[hoverRating as keyof typeof ratingLabels]}
                                            </div>
                                        )}

                                        {rating > 0 && (
                                            <div className='absolute left-full ml-2 top-1/2 -translate-y-1/2'>
                                                <div className='px-1 py-0.5 text-[10px] font-normal text-white rounded whitespace-nowrap justify-end border-[1px] border-gray-600'>
                                                    {ratingLabels[rating as keyof typeof ratingLabels]}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-2 md:space-y-3'>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value.slice(0, maxChars))}
                                rows={3}
                                placeholder={t('writeComment')}
                                className='w-full p-2 md:p-3 focus:ring rounded-lg border-1 bg-[#ffffff]/5  text-gray-100 text-sm'
                            />
                            <div className='flex justify-between items-center text-xs md:text-sm text-gray-400'>
                                <span>
                                    {comment.length}/{maxChars} {t('characters')}
                                </span>
                                {comment.length > maxChars * 0.8 && (
                                    <span className='text-brand'>
                                        {maxChars - comment.length} {t('characters')}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-row gap-2 md:gap-3 pt-2 justify-end w-full'>
                            <button
                                type='button'
                                onClick={handleCancel}
                                className='w-[70px] sm:w-[80px] md:w-[90px] py-1 px-2 md:py-1 md:px-3 rounded-[4px] font-medium bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/40 transition-all duration-200 backdrop-blur-sm text-sm cursor-pointer'
                            >
                                {t('cancel')}
                            </button>
                            <button
                                type='submit'
                                disabled={rating === 0}
                                className={`w-[70px] sm:w-[80px] md:w-[90px] py-1 px-2 md:py-1 md:px-3 rounded-[4px] font-medium transition-all duration-200 text-sm ${
                                    rating === 0
                                        ? 'bg-[#6d6d6e]/40 cursor-not-allowed text-white/40 '
                                        : 'bg-brand hover:bg-brand/90 text-white cursor-pointer'
                                }`}
                            >
                                {t('submitRating')}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
