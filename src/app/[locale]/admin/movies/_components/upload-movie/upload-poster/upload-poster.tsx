'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Control } from 'react-hook-form'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface PosterUploadFieldProps {
    control: Control<any>
    formState: any
    name: 'vertical_poster' | 'horizontal_poster'
    label: string
    aspectRatio?: '3/4' | '16/9' | '1/1'
    className?: string
    initialImage?: string
}

export default function PosterUploadField({
    control,
    formState,
    name,
    label,
    aspectRatio = '3/4',
    className,
    initialImage
}: PosterUploadFieldProps) {
    const validMessage = useTranslations('AdminPage.uploadFilm.validation')
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragActive, setIsDragActive] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const aspectClass = {
        '3/4': 'aspect-[3/4] w-40',
        '16/9': 'aspect-video w-72',
        '1/1': 'aspect-square w-40'
    }[aspectRatio]

    useEffect(() => {
        if (initialImage && !previewUrl) {
            setPreviewUrl(initialImage)
        }
    }, [initialImage, previewUrl])

    const updatePreview = useCallback(
        (file: File | null, onChange: (v: File | null) => void) => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
            if (file) {
                const url = URL.createObjectURL(file)
                setPreviewUrl(url)
                onChange(file)
            } else {
                setPreviewUrl(null)
                onChange(null)
                if (inputRef.current) inputRef.current.value = ''
            }
        },
        [previewUrl]
    )

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                useEffect(() => {
                    if (field.value instanceof File) updatePreview(field.value, () => {})
                    else if (!field.value && previewUrl) updatePreview(null, () => {})
                }, [field.value])

                const hasPreview = !!previewUrl
                const handleDrop = (e: React.DragEvent) => {
                    e.preventDefault()
                    setIsDragActive(false)
                    if (hasPreview) return
                    const file = e.dataTransfer.files?.[0]
                    if (file?.type.startsWith('image/')) updatePreview(file, field.onChange)
                }

                const errorMessageKey =
                    name === 'vertical_poster' ? 'verticalPosterRequired' : 'horizontalPosterRequired'

                return (
                    <FormItem className={cn('w-full', className)}>
                        <FormLabel className='font-semibold text-sm'>{label}</FormLabel>
                        <FormControl>
                            <div
                                className={cn(
                                    'relative flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted p-6 cursor-pointer transition-all',
                                    'hover:border-primary hover:bg-primary/5',
                                    isDragActive && 'border-primary bg-primary/10',
                                    hasPreview && 'cursor-default',
                                    'h-64'
                                )}
                                onClick={() => !hasPreview && inputRef.current?.click()}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    if (!hasPreview) setIsDragActive(true)
                                }}
                                onDragLeave={(e) => {
                                    e.preventDefault()
                                    setIsDragActive(false)
                                }}
                                onDrop={handleDrop}
                            >
                                {hasPreview ? (
                                    <PreviewState
                                        url={previewUrl!}
                                        aspect={aspectClass}
                                        onChange={() => inputRef.current?.click()}
                                    />
                                ) : (
                                    <EmptyState />
                                )}

                                <input
                                    ref={inputRef}
                                    type='file'
                                    accept='image/*'
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) updatePreview(file, field.onChange)
                                        e.target.value = ''
                                    }}
                                />
                            </div>
                        </FormControl>

                        <FormMessage className='text-xs text-red-500'>
                            {formState.errors?.[name]?.message && validMessage(errorMessageKey)}
                        </FormMessage>
                    </FormItem>
                )
            }}
        />
    )
}

function EmptyState() {
    const t = useTranslations('AdminPage.uploadFilm.uploadPoster')
    return (
        <>
            <Image
                src='/images/upload-film/upload.svg'
                alt='Upload image'
                width={64}
                height={64}
                className='mb-4 opacity-70'
            />
            <p className='text-base font-medium text-center'>{t('guide')}</p>
        </>
    )
}

function PreviewState({ url, aspect, onChange }: { url: string; aspect: string; onChange: () => void }) {
    const t = useTranslations('AdminPage.uploadFilm.uploadPoster')
    return (
        <div className={cn('relative overflow-hidden rounded-lg group', aspect)}>
            <img
                src={url}
                alt='Preview'
                className='w-full h-full object-cover rounded-lg transition-transform duration-300'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity'>
                <Button
                    type='button'
                    variant='secondary'
                    size='sm'
                    className='bg-white/80 text-black font-semibold hover:bg-white'
                    onClick={onChange}
                >
                    {t('changePoster')}
                </Button>
            </div>
        </div>
    )
}
