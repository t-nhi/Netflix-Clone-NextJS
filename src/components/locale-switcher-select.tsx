'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useLocale, useTranslations } from 'next-intl'
import useLanguage from '@/hooks/shared/useLanguage'
import { LANGUAGES } from '@/i18n/i18n-config'
import { cn } from '@/lib/utils'
import { LanguagesIcon } from 'lucide-react'

interface SelectLanguageProps {
    className?: string
    isSmall?: boolean
}

export default function SelectLanguage({ className, isSmall }: SelectLanguageProps) {
    const t = useTranslations('SwitchLanguage')
    const locale = useLocale()

    const { onChange, isPending } = useLanguage()

    return (
        <Select value={locale} onValueChange={onChange} disabled={isPending}>
            <SelectTrigger
                className={cn('w-[150px] transition-all duration-200 cursor-pointer', className, {
                    'w-[60px]': isSmall
                })}
            >
                <>{isSmall ? <LanguagesIcon /> : <SelectValue placeholder={t('label')} />}</>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{t('label')}</SelectLabel>
                    {LANGUAGES.map(({ value, labelKey }) => (
                        <SelectItem key={value} value={value}>
                            {t(labelKey as 'en' | 'vi')}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
