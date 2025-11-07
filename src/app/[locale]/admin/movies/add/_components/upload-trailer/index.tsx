'use client'

import FileInfo from '@/app/[locale]/admin/movies/add/_components/upload-trailer/file-infor'
import UploadFile, { UploadFileRef } from '@/app/[locale]/admin/movies/add/_components/upload-trailer/upload-file'
import VideoPreview from '@/app/[locale]/admin/movies/add/_components/video-preview'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

interface UploadVideoProps {
    onFileSelect: (file: File | null) => void
    file: File | null
    className?: string
    isInitialRender?: boolean
    setIsInitialRender: (value: boolean) => void
    onReset: () => void
}

export default function UploadVideo({
    onFileSelect,
    file,
    className,
    isInitialRender,
    setIsInitialRender,
    onReset
}: UploadVideoProps) {
    const uploadFileRef = useRef<UploadFileRef>(null)

    const handleReplaceFile = () => {
        onReset()
        uploadFileRef.current?.resetAndActive()
    }

    return (
        <>
            <UploadFile
                onFileSelect={onFileSelect}
                className={cn(className, {
                    hidden: file != null
                })}
                isInitialRender={isInitialRender}
                setIsInitialRender={setIsInitialRender}
                ref={uploadFileRef}
            />

            {file && (
                <div className={cn('grid grid-cols-2 gap-6 items-start justify-start w-full', className)}>
                    <div className='w-full'>
                        <FileInfo file={file} onReplaceFile={handleReplaceFile} />
                    </div>
                    <div className='w-full'>
                        <VideoPreview videoSrc={file} title='Trailer' />
                    </div>
                </div>
            )}
        </>
    )
}
