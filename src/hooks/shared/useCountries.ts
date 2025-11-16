'use client'

import { useLocale } from 'next-intl'
import { useMemo } from 'react'
import countries from 'i18n-iso-countries'

import countriesEn from 'i18n-iso-countries/langs/en.json'
import countriesVi from 'i18n-iso-countries/langs/vi.json'
countries.registerLocale(countriesEn)
countries.registerLocale(countriesVi)

export const useCountries = () => {
    const locale = useLocale()

    return useMemo(() => {
        const codes = countries.getAlpha2Codes()
        return Object.entries(codes)
            .map(([code, name]) => ({
                code: code.toUpperCase(),
                name: countries.getName(code, locale) || name
            }))
            .sort((a, b) => a.name.localeCompare(b.name, locale))
    }, [locale])
}
