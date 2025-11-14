'use client'

import { useEffect, useState, forwardRef, Ref } from 'react'

interface VideoPreviewProps {
    videoSrc: string | File
    title?: string
}

const VideoPreview = forwardRef<HTMLVideoElement, VideoPreviewProps>(
    ({ videoSrc, title }, ref: Ref<HTMLVideoElement>) => {
        const [url, setUrl] = useState<string>('')

        useEffect(() => {
            if (videoSrc instanceof File) {
                const objectUrl = URL.createObjectURL(videoSrc)
                setUrl(objectUrl)
                return () => URL.revokeObjectURL(objectUrl)
            } else {
                setUrl(videoSrc)
            }
        }, [videoSrc])

        if (!url) return null

        return (
            <div className='relative aspect-video bg-black rounded-md overflow-hidden mx-auto'>
                {title && (
                    <div className='absolute top-2 left-2 text-white text-sm font-medium z-10 bg-black/50 px-2 py-1 rounded'>
                        {title}
                    </div>
                )}

                <video
                    ref={ref}
                    src={url || undefined}
                    controls
                    className='w-full h-full object-cover'
                    preload='metadata'
                />
            </div>
        )
    }
)

VideoPreview.displayName = 'VideoPreview'

export default VideoPreview
