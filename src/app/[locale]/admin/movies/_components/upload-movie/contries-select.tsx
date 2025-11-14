'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control } from 'react-hook-form'
import { useCountries } from '@/hooks/shared/useContries'
import { useTranslations } from 'next-intl'

interface CountrySelectProps {
    control: Control<any>
    formState: any
    name: string
    label?: string
    placeholder?: string
}

export const CountrySelect = ({
    control,
    formState,
    name,
    label = 'Quốc gia',
    placeholder = 'Chọn quốc gia'
}: CountrySelectProps) => {
    const validMessage = useTranslations('AdminPage.uploadFilm.validation')
    const countries = useCountries()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                console.log('CountrySelect value =', field.value)
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Select
                                key={field.value}
                                value={field.value || ''}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder}>
                                        {field.value ? countries.find((c) => c.code === field.value)?.name : undefined}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className='max-h-96'>
                                    {countries.map((c) => (
                                        <SelectItem key={c.code} value={c.code}>
                                            <span className='mr-2'>
                                                {c.code
                                                    .toLowerCase()
                                                    .split('')
                                                    .map((char) =>
                                                        String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 97)
                                                    )
                                                    .join('')}
                                            </span>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage className='text-xs text-red-500 mt-1'>
                            {formState.errors[name]?.message &&
                                validMessage(formState.errors[name]?.message as 'countryRequired')}
                        </FormMessage>
                    </FormItem>
                )
            }}
        />
    )
}
