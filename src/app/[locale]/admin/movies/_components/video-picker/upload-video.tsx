'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import UploadGuideLine from '@/app/[locale]/admin/movies/_components/video-picker/upload-guide-lines'

export const UploadVideoViewMode = {
    INITIAL: 'initial',
    FILE_SELECTED: 'file_selected'
}
export type UploadVideoViewModeType = (typeof UploadVideoViewMode)[keyof typeof UploadVideoViewMode]
export interface UploadVideoProps {
    onFileSelect: (file: File | null) => void
    className?: string
    viewMode?: UploadVideoViewModeType
    setIsInitialRender: (value: boolean) => void
    title?: string
    description?: string
    selectButton?: string
}

export interface UploadVideoRef {
    resetAndActive: () => void
}

const UploadVideo = forwardRef<UploadVideoRef, UploadVideoProps>(
    (
        {
            onFileSelect,
            className,
            viewMode = UploadVideoViewMode.INITIAL,
            setIsInitialRender,
            title = 'Select file to upload',
            description = 'Drag and drop a video file here or click to select one.',
            selectButton = 'Select Video'
        },
        ref
    ) => {
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
                            'min-h-[400px] flex-col': viewMode === UploadVideoViewMode.INITIAL,
                            'min-h-[200px] flex-row gap-4': viewMode === UploadVideoViewMode.FILE_SELECTED
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
                            'items-center': viewMode === UploadVideoViewMode.INITIAL,
                            'items-start': viewMode === UploadVideoViewMode.FILE_SELECTED
                        })}
                    >
                        <h1 className='mb-1 text-2xl font-bold'>{title}</h1>
                        <p className='mb-4 text-base text-muted-foreground'>{description}</p>
                    </div>

                    {viewMode === UploadVideoViewMode.INITIAL && (
                        <Button className='mb-6 bg-brand font-semibold text-white hover:bg-brand/90'>
                            {selectButton}
                        </Button>
                    )}
                </div>
                {viewMode === UploadVideoViewMode.INITIAL && <UploadGuideLine className='mt-8' />}
            </div>
        )
    }
)

UploadVideo.displayName = 'UploadVideo'

export default UploadVideo
