import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface StarRatingProps {
    rating: number
    max?: number
    className?: string
    size?: number
    onChange?: (value: number) => void
    onStarHover?: (value: number) => void
    readOnly?: boolean
}

export default function StarRating({
    rating,
    max = 5,
    className,
    size = 5,
    onChange,
    onStarHover,
    readOnly = false
}: StarRatingProps) {
    const handleStarClick = (value: number) => {
        if (!readOnly && onChange) {
            onChange(value)
        }
    }

    const handleStarHover = (value: number) => {
        if (onStarHover) {
            onStarHover(value)
        }
    }
    return (
        <div className={cn('flex items-center gap-1', className)}>
            {Array.from({ length: max }, (_, i) => {
                const starValue = i + 1
                return (
                    <div
                        key={i}
                        className={cn(readOnly ? '' : 'cursor-pointer')}
                        {...(!readOnly && {
                            onClick: () => handleStarClick(starValue),
                            onMouseEnter: () => handleStarHover(starValue),
                            onMouseLeave: () => handleStarHover(0)
                        })}
                    >
                        {rating >= starValue ? (
                            <FaStar className='text-yellow-500' size={size} />
                        ) : rating >= starValue - 0.5 ? (
                            <FaStarHalfAlt className='text-yellow-500' size={size} />
                        ) : (
                            <FaRegStar className='text-yellow-500' size={size} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
