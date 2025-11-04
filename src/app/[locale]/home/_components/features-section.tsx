import { useAppFeatures, FeatureType } from '@/app/[locale]/home/_constants/index'
import { cn } from '@/lib/utils'

interface FeaturesSectionProps {
    className?: string
}
export function FeaturesSection({ className }: FeaturesSectionProps) {
    const features = useAppFeatures()

    return (
        <div className={cn('grid grid-cols-1   md:grid-cols-2 xl:grid-cols-4 gap-2  md:gap-4', className)}>
            {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
            ))}
        </div>
    )
}

function FeatureCard({ feature }: { feature: FeatureType }) {
    const { title, description, Icon } = feature

    return (
        <div
            className='rounded-2xl xl:min-h-[308px] flex flex-col justify-between 
                border backdrop-blur-sm p-4
                bg-gradient-to-br from-white via-purple-50 to-blue-50
                dark:from-purple-900/30 dark:via-blue-900/30 dark:to-purple-800/40
                border-gray-200 dark:border-purple-500/20'
        >
            <div className='flex-1'>
                <h3 className='text-gray-700 dark:text-white text-2xl font-bold mb-4'>{title}</h3>
                <p className='text-gray-700 dark:text-gray-300 text-base leading-relaxed'>{description}</p>
            </div>
            <div className='flex justify-end'>
                <div className='w-16 h-16 flex items-center justify-center'>
                    <Icon className='w-14 h-14 text-purple-600 dark:text-purple-400' />
                </div>
            </div>
        </div>
    )
}
