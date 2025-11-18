'use client'

import FileInfo from '@/app/[locale]/admin/movies/_components/video-picker/file-info'
import VideoPreview from '@/app/[locale]/admin/movies/_components/video-picker/video-preview'
import { cn } from '@/lib/utils'
import UploadVideo, { UploadVideoProps, UploadVideoRef, UploadVideoViewMode } from './upload-video'
import { useEffect, useRef, useState } from 'react'

interface VideoPickerProps extends Pick<UploadVideoProps, 'title' | 'description' | 'selectButton'> {
    onFileSelect: (file: File | null) => void
    file: File | null
    className?: string
    onReset: () => void
    isLoading?: boolean
}

export default function VideoPicker({
    onFileSelect,
    file,
    onReset,
    isLoading = false,
    className,
    title,
    description,
    selectButton
}: VideoPickerProps) {
    const [isInitialRender, setIsInitialRender] = useState<boolean>(() => (file ? false : true))
    const uploadVideoRef = useRef<UploadVideoRef>(null)
    const handleReplaceFile = () => {
        onReset()
        uploadVideoRef.current?.resetAndActive()
    }

    useEffect(() => {
        if (isInitialRender && file) setIsInitialRender(false)
    }, [file])

    return (
        <>
            {file == null ? (
                <UploadVideo
                    onFileSelect={onFileSelect}
                    className={className}
                    viewMode={isInitialRender ? UploadVideoViewMode.INITIAL : UploadVideoViewMode.FILE_SELECTED}
                    setIsInitialRender={setIsInitialRender}
                    ref={uploadVideoRef}
                    description={description}
                    title={title}
                    selectButton={selectButton}
                />
            ) : (
                <div className={cn('flex gap-2 justify-start w-full ', className)}>
                    <div className='w-full'>
                        <FileInfo file={file} onReplaceFile={handleReplaceFile} />
                    </div>
                    <div className='w-full'>
                        <VideoPreview videoSrc={file} title={file.name} />
                    </div>
                </div>
            )}
        </>
    )
}
