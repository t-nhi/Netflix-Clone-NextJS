'use client'

import FileInfo from '@/app/[locale]/admin/movies/_components/video-picker/file-info'
import VideoPreview from '@/app/[locale]/admin/movies/_components/video-picker/video-preview'
import { cn } from '@/lib/utils'
import { useRef } from 'react'
import UploadVideo, {
    UploadVideoProps,
    UploadVideoRef,
    UploadVideoViewMode,
    UploadVideoViewModeType
} from './upload-video'

interface VideoPickerProps extends Pick<UploadVideoProps, 'title' | 'description' | 'selectButton'> {
    onFileSelect: (file: File | null) => void
    file: File | null
    className?: string
    viewMode?: UploadVideoViewModeType
    setIsInitialRender: (value: boolean) => void
    onReset: () => void
}

export default function VideoPicker({
    onFileSelect,
    file,
    className,
    viewMode = UploadVideoViewMode.INITIAL,
    setIsInitialRender,
    onReset,
    title,
    description,
    selectButton
}: VideoPickerProps) {
    const uploadVideoRef = useRef<UploadVideoRef>(null)
    const handleReplaceFile = () => {
        onReset()
        uploadVideoRef.current?.resetAndActive()
    }

    return (
        <>
            {file == null ? (
                <UploadVideo
                    onFileSelect={onFileSelect}
                    className={className}
                    viewMode={viewMode}
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
