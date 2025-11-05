import { i18nConfig, localesType } from '@/i18n/i18n-config'
import { useTranslations } from 'next-intl'

export function stripLocaleFromPath(pathname: string): string {
    for (const locale of i18nConfig.locales as string[]) {
        if (pathname == `/${locale}`) return '/'
        if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1) || '/'
    }
    return pathname
}

interface BuildURLWithLocaleParams {
    url: string
    baseUrl: string
    locale: localesType | null | undefined
}

export function buildURLObjWithLocale({
    url,
    baseUrl,
    locale = i18nConfig.defaultLocale
}: BuildURLWithLocaleParams): URL {
    if (!locale) locale = i18nConfig.defaultLocale

    const urlObj = new URL(url, baseUrl)
    urlObj.pathname = `/${locale}${urlObj.pathname}`
    return urlObj
}
export function getLocaleMessage(t: ReturnType<typeof useTranslations>, key?: string): string {
    if (!key) return ''

    if (t.has(key as never)) {
        return t(key as never)
    }

    return key
}
