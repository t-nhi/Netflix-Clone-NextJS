'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils' // hoặc đường dẫn utils bạn đang dùng

interface SeeMoreProps {
    text: string
    maxLines?: number
    className?: string
    classLabel?: string
    seeMoreText?: string
    seeLessText?: string
}

export default function SeeMore({
    text,
    maxLines = 4,
    className,
    classLabel,
    seeMoreText = 'See More',
    seeLessText = 'See Less'
}: SeeMoreProps) {
    const [expanded, setExpanded] = useState(false)
    const [isOverflow, setIsOverflow] = useState(false)
    const [isMeasured, setIsMeasured] = useState(false)
    const textRef = useRef<HTMLParagraphElement | null>(null)

    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                const lineHeight = parseFloat(window.getComputedStyle(textRef.current).lineHeight)
                const maxHeight = lineHeight * maxLines
                setIsOverflow(textRef.current.scrollHeight > Math.ceil(maxHeight))
                setIsMeasured(true)
            }
        }

        requestAnimationFrame(checkOverflow)
        window.addEventListener('resize', checkOverflow)
        return () => window.removeEventListener('resize', checkOverflow)
    }, [text, maxLines])

    return (
        <div
            className={cn('text-sm transition-all duration-200', className)}
            style={{ visibility: isMeasured ? 'visible' : 'hidden' }}
        >
            <p
                ref={textRef}
                className={cn('transition-all', !expanded && isOverflow && 'overflow-hidden line-clamp-[unset]')}
                style={
                    !expanded && isOverflow
                        ? {
                              display: '-webkit-box',
                              WebkitLineClamp: maxLines,
                              WebkitBoxOrient: 'vertical'
                          }
                        : { display: 'block' }
                }
            >
                {text}
            </p>

            {isOverflow && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={cn('mt-1 text-sm text-blue-500 hover:underline', classLabel)}
                >
                    {expanded ? seeLessText : seeMoreText}
                </button>
            )}
        </div>
    )
}
