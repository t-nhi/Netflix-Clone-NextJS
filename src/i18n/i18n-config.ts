export type localesType = 'en' | 'vi'

type I18nConfigType = {
    locales: localesType[]
    defaultLocale: localesType
}

export const i18nConfig: I18nConfigType = {
    locales: ['en', 'vi'],
    defaultLocale: 'en'
}

type Language = {
    value: localesType
    labelKey: string
}
export const LANGUAGES: Language[] = [
    { value: 'en', labelKey: 'en' },
    { value: 'vi', labelKey: 'vi' }
] as const
