interface StatCardProps {
    title: string
    value: string | number
    icon: React.ComponentType
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
    return (
        <div className='relative bg-white dark:bg-black/90 dark:border dark:border-white/5 w-40 aspect-square shadow rounded-xl p-4 flex flex-col justify-between'>
            <div>
                <p className='text-gray-500 text-sm whitespace-nowrap'>{title}</p>
                <p className='text-xl mt-3 font-bold'>{value}</p>
            </div>
            <div className='text-gray-300 text-5xl self-end'>
                <Icon />
            </div>
        </div>
    )
}
