export default function Quit(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            className='w-5 h-5 md:w-6 md:h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            {...props}
        >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
        </svg>
    )
}
