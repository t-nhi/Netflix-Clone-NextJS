type StarIconProps = {
    size: number
    fillType: 'full' | 'half' | 'empty'
    starId: number
}

function FiveStar({ size, fillType, starId }: StarIconProps) {
    const starPath = 'M12 2L14.5 8.5L21.5 9.5L16.5 14L18 21L12 17.5L6 21L7.5 14L2.5 9.5L9.5 8.5L12 2Z'

    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            aria-hidden
            className='transition-transform duration-200 hover:scale-110'
        >
            {fillType === 'half' && (
                <defs>
                    <linearGradient id={`half-gradient-${starId}`} x1='0%' y1='0%' x2='100%' y2='0%'>
                        <stop offset='50%' stopColor='#fbbf24' />
                        <stop offset='50%' stopColor='transparent' />
                    </linearGradient>
                </defs>
            )}
            <path
                d={starPath}
                stroke='#fbbf24'
                strokeWidth={0.8}
                strokeLinejoin='round'
                strokeLinecap='round'
                fill={fillType === 'full' ? '#fbbf24' : fillType === 'half' ? `url(#half-gradient-${starId})` : 'none'}
                className='transition-all duration-200'
            />
        </svg>
    )
}

export default FiveStar
