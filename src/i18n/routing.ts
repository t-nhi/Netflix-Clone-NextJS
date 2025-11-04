import { i18nConfig } from '@/i18n/i18n-config'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
    locales: i18nConfig.locales,

    defaultLocale: i18nConfig.defaultLocale
})
