'use client'

import { cn } from '@/lib/utils'
import { toggleMute } from '@/store/features/video.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useCallback } from 'react'
import { FaVolumeUp } from 'react-icons/fa'
import { FaVolumeMute } from 'react-icons/fa'

interface ButtonMutedProps {
    className?: string
}

export default function ButtonMuted({ className }: ButtonMutedProps) {
    const appDispatch = useAppDispatch()

    const isMuted = useAppSelector((state) => state.video.isMuted)
    const onToggle = useCallback(() => {
        appDispatch(toggleMute())
    }, [appDispatch])

    return (
        <button
            onClick={onToggle}
            className={cn(
                'rounded-full flex items-center justify-center bg-transparent border border-white text-white hover:bg-black/70 transition-colors',
                'size-10 [&_svg]:size-4',
                className
            )}
        >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
    )
}
