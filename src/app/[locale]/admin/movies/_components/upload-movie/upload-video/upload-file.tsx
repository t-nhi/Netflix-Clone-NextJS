'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import UploadGuideLine from '@/app/[locale]/admin/movies/_components/upload-movie/upload-video/upload-guide-lines'

export const UploadFileViewMode = {
    INITIAL: 'initial',
    FILE_SELECTED: 'file_selected'
}
export type UploadFileViewModeType = (typeof UploadFileViewMode)[keyof typeof UploadFileViewMode]

interface UploadFileProps {
    onFileSelect: (file: File | null) => void
    className?: string
    viewMode?: UploadFileViewModeType
    setIsInitialRender: (value: boolean) => void
}

export interface UploadFileRef {
    resetAndActive: () => void
}

const UploadFile = forwardRef<UploadFileRef, UploadFileProps>(
    ({ onFileSelect, className, viewMode = UploadFileViewMode.INITIAL, setIsInitialRender }, ref) => {
        const t = useTranslations('AdminPage.uploadFilm.uploadFile')
        const [isDragActive, setIsDragActive] = useState(false)
        const inputRef = useRef<HTMLInputElement>(null)

        useImperativeHandle(ref, () => ({
            resetAndActive: () => {
                if (inputRef.current) {
                    inputRef.current.value = ''
                    inputRef.current.click()
                    onFileSelect(null)
                }
            }
        }))

        const handleDrag = (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (e.type === 'dragenter' || e.type === 'dragover') {
                setIsDragActive(true)
            } else if (e.type === 'dragleave') {
                setIsDragActive(false)
            }
        }

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragActive(false)

            const droppedFile = e.dataTransfer.files[0]
            if (droppedFile && droppedFile.type.startsWith('video/')) {
                onFileSelect(droppedFile)
                setIsInitialRender(false)
            }
        }

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0] && e.target.files[0].type.startsWith('video/')) {
                onFileSelect(e.target.files[0])
                setIsInitialRender(false)
            }
        }

        return (
            <div className={cn('border border-border rounded-lg p-6', className)}>
                <div
                    className={cn(
                        'relative  flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted',
                        isDragActive && 'border-primary bg-primary/5',
                        {
                            'min-h-[400px] flex-col': viewMode === UploadFileViewMode.INITIAL,
                            'min-h-[200px] flex-row gap-4': viewMode === UploadFileViewMode.FILE_SELECTED
                        }
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type='file'
                        accept='video/*'
                        onChange={handleFileChange}
                        className='absolute inset-0 cursor-pointer opacity-0'
                        onClick={(event) => {
                            ;(event.target as HTMLInputElement).value = ''
                        }}
                        ref={inputRef}
                    />

                    <div className='mb-3'>
                        <Image
                            src='/images/upload-film/upload.svg'
                            alt='Upload video'
                            className='mx-auto h-20 w-20'
                            width={72}
                            height={72}
                        />
                    </div>
                    <div
                        className={cn('flex flex-col', {
                            'items-center': viewMode === UploadFileViewMode.INITIAL,
                            'items-start': viewMode === UploadFileViewMode.FILE_SELECTED
                        })}
                    >
                        <h1 className='mb-1 text-2xl font-bold'>{t('selectFile')}</h1>
                        <p className='mb-4 text-base text-muted-foreground'>{t('draganddrop')}</p>
                    </div>

                    {viewMode === UploadFileViewMode.INITIAL && (
                        <Button className='mb-6 bg-brand font-semibold text-white hover:bg-brand/90'>
                            {t('selectButton')}
                        </Button>
                    )}
                </div>
                {viewMode === UploadFileViewMode.INITIAL && <UploadGuideLine className='mt-8' />}
            </div>
        )
    }
)

UploadFile.displayName = 'UploadFile'

export default UploadFile
