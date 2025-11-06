import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useId } from 'react'

interface BrandInputProps extends Omit<React.ComponentProps<'input'>, 'placeholder'> {
    wrapperClassName?: string
    label: string
    labelClassName?: string
}

export default function BrandInput(props: BrandInputProps) {
    const { className, wrapperClassName, label, labelClassName, ...rest } = props
    const fieldID = useId()

    return (
        <div className={cn('relative w-full h-fit', wrapperClassName)}>
            <Input
                placeholder=' '
                className={cn(
                    'peer w-full rounded-md border px-4  pt-7 pb-4 text-gray-900 dark:text-white',
                    'border-gray-400 dark:border-white/40',
                    'focus:border-black dark:focus:border-white',
                    'focus:ring-2 focus:ring-blue-500 focus:ring-offset-0',
                    'caret-black dark:caret-white',
                    'selection:bg-blue-600 selection:text-white',
                    'transition-all duration-200',
                    className
                )}
                {...rest}
                id={fieldID}
            />
            <label
                htmlFor={fieldID}
                className={cn(
                    'absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-500 dark:text-white/70 pointer-events-none',
                    'transition-all duration-200 ease-in-out',
                    'peer-placeholder-shown:text-base',
                    'peer-focus:text-xs peer-focus:top-1 peer-focus:translate-y-0',
                    'peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs',
                    labelClassName
                )}
            >
                {label}
            </label>
        </div>
    )
}
