'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface PosterPickerProps {
    previewClass?: string
    className?: string
    value?: File | null
    onChange?: (file: File) => void
}

export default function PosterPicker({ previewClass, className, value, onChange }: PosterPickerProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragActive, setIsDragActive] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(() => (value ? URL.createObjectURL(value) : null))

    const hasPreview = useMemo(() => !!previewUrl, [previewUrl])

    const updateFile = (file: File) => {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setIsDragActive(false)
        onChange?.(file)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragActive(false)

        const file = e.dataTransfer.files[0]
        if (file) {
            updateFile(file)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            updateFile(file)
            e.target.value = ''
        }
    }

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    return (
        <div
            className={cn(
                'relative flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted  cursor-pointer transition-all',
                'border-border hover:bg-primary/5 hover:border-brand',
                {
                    'cursor-default ': hasPreview,
                    'border-primary bg-primary/10 p-6': isDragActive
                },
                className
            )}
            onClick={() => inputRef.current?.click()}
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
                <PosterPreview url={previewUrl!} className={previewClass} onChange={() => inputRef.current?.click()} />
            ) : (
                <EmptyState />
            )}

            <input ref={inputRef} type='file' accept='image/*' hidden onChange={handleFileChange} />
        </div>
    )
}

function EmptyState() {
    const t = useTranslations('AdminPage.uploadFilm.uploadPoster')

    return (
        <>
            <Image
                src='/images/upload-film/upload.svg'
                alt='Select image'
                width={64}
                height={64}
                className='mb-4 opacity-70'
            />
            <p className='text-xs font-normal text-center text-muted-foreground'>{t('guide')}</p>
        </>
    )
}

interface PosterPreviewProps {
    url: string
    className?: string
    onChange: () => void
}

function PosterPreview({ url, className, onChange }: PosterPreviewProps) {
    const t = useTranslations('AdminPage.uploadFilm.uploadPoster')

    return (
        <div className={cn('relative overflow-hidden rounded-lg group w-full h-full', className)}>
            <Image
                src={url}
                alt='Preview'
                fill
                className='w-full h-full object-cover bg-center rounded-lg transition-transform duration-300'
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
