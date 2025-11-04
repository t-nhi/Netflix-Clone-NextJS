'use client'
import { useState, useRef, useEffect } from 'react'

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
    className = '',
    classLabel = '',
    seeMoreText = 'See More',
    seeLessText = 'See Less'
}: SeeMoreProps) {
    const [expanded, setExpanded] = useState(false)
    const [isOverflow, setIsOverflow] = useState(false)
    const textRef = useRef<HTMLParagraphElement | null>(null)

    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                const lineHeight = parseFloat(window.getComputedStyle(textRef.current).lineHeight)
                const maxHeight = lineHeight * maxLines
                setIsOverflow(textRef.current.scrollHeight > Math.ceil(maxHeight))
            }
        }

        checkOverflow()
        window.addEventListener('resize', checkOverflow)
        return () => window.removeEventListener('resize', checkOverflow)
    }, [text, maxLines])

    return (
        <div className={`text-sm ${className}`}>
            <p
                ref={textRef}
                className={`transition-all ${!expanded && isOverflow ? 'overflow-hidden' : ''} ${className}`}
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
                <button onClick={() => setExpanded(!expanded)} className={`mt-1 text-sm hover:underline ${classLabel}`}>
                    {expanded ? seeLessText : seeMoreText}
                </button>
            )}
        </div>
    )
}
