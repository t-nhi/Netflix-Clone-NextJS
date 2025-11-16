'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface OptionType {
    value: string
    label: string
}

interface ComboboxMultiSelectProps {
    options: OptionType[]
    selectedValues?: string[]
    onSelectedValuesChange?: (selectedValues: string[]) => void
    placeholder?: string
    notfoundText?: string
    className?: string
    optionClassName?: string
}
export default function ComboboxMultiSelect({
    options,
    selectedValues: selectedValuesProp,
    onSelectedValuesChange,
    placeholder = 'Select options...',
    notfoundText = 'No option found.',
    className,
    optionClassName
}: ComboboxMultiSelectProps) {
    const [open, setOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>(selectedValuesProp || [])

    const handleSelectedValuesChange = (values: string[]) => {
        setSelectedValues(values)
        onSelectedValuesChange?.(values)
    }

    return (
        <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
                <Button
                    aria-expanded={open}
                    className={cn('w-full justify-between max-h-none! h-fit!', className)}
                    role='combobox'
                    variant='outline'
                >
                    <div className='flex flex-wrap gap-1'>
                        {selectedValues.length > 0 ? (
                            selectedValues.map((value) => (
                                <Badge
                                    className={cn('mr-1 hover:bg-brand/20', optionClassName)}
                                    key={value}
                                    variant='secondary'
                                >
                                    {options.find((option) => option.value === value)?.label}
                                    <div
                                        aria-label={`Remove ${options.find((option) => option.value === value)?.label}`}
                                        role='button'
                                        className='ml-1  cursor-pointer  rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                                        onClick={() =>
                                            handleSelectedValuesChange(selectedValues.filter((v) => v !== value))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSelectedValuesChange(selectedValues.filter((v) => v !== value))
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                    >
                                        <X className='size-3 text-muted-foreground  hover:text-foreground' />
                                    </div>
                                </Badge>
                            ))
                        ) : (
                            <span className='text-muted-foreground font-light'>{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0'>
                <Command>
                    <CommandInput placeholder='Search tags...' />
                    <CommandList>
                        <CommandEmpty>{notfoundText}</CommandEmpty>
                        <CommandGroup>
                            {options.map((tag) => (
                                <CommandItem
                                    key={tag.value}
                                    onSelect={(currentValue) => {
                                        setSelectedValues(
                                            selectedValues.includes(currentValue)
                                                ? selectedValues.filter((v) => v !== currentValue)
                                                : [...selectedValues, currentValue]
                                        )
                                    }}
                                    value={tag.value}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 size-4',
                                            selectedValues.includes(tag.value) ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    {tag.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
