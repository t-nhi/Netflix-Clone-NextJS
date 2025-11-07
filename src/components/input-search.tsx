'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    className?: string
}

export default function InputSearch({ placeholder = 'Search', value = '', onChange, className }: SearchInputProps) {
    const [internalValue, setInternalValue] = useState(value)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setInternalValue(val)
        onChange?.(val)
    }

    const handleClear = () => {
        setInternalValue('')
        onChange?.('')
    }

    return (
        <div
            className={cn(
                'relative group flex-1 min-w-[180px] sm:min-w-[240px] md:min-w-[300px] lg:min-w-[400px] max-w-[550px]',
                className
            )}
        >
            <Search
                className='absolute left-2 top-1/2 -translate-y-1/2
                w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 transition-all duration-300
                group-hover:text-black dark:group-hover:text-white
                group-focus-within:text-black dark:group-focus-within:text-white'
            />
            <input
                type='text'
                value={internalValue}
                onChange={handleChange}
                placeholder={placeholder}
                className='w-full bg-transparent text-gray-900 dark:text-white text-sm
                border-b border-gray-400/30 dark:border-gray-500/30
                outline-none py-2 px-10 focus:border-transparent peer'
            />
            {internalValue && (
                <button
                    onClick={handleClear}
                    className='absolute right-2 top-1/2 -translate-y-1/2
                    text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white
                    transition-all duration-200 opacity-90 hover:opacity-100'
                    aria-label='Clear search'
                >
                    <X className='w-4 h-4 md:w-5 md:h-5 cursor-pointer' />
                </button>
            )}
            <span
                className='absolute left-1/2 bottom-0 h-[1.5px]
                bg-black dark:bg-white w-0 group-focus-within:w-full
                transition-all duration-300 ease-out origin-center transform -translate-x-1/2'
            />
        </div>
    )
}
