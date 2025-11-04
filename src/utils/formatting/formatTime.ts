import { localesType } from '@/i18n/i18n-config'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import vi from 'javascript-time-ago/locale/vi'

TimeAgo.addLocale(en)
TimeAgo.addDefaultLocale(vi)
TimeAgo.setDefaultLocale('vi')

export function timeAgo({ locale, date }: { locale: localesType; date: string }) {
    try {
        const parsedDate = new Date(date)
        const timeAgo = new TimeAgo(locale)
        return timeAgo.format(parsedDate, 'twitter-minute-now')
    } catch (error) {
        console.error('Error in timeAgo function:', error)
        return ''
    }
}
export function formatDayMonth({ locale, date }: { locale: localesType; date: string }): string {
    try {
        const parsedDate = new Date(date)

        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        if (parsedDate.toDateString() === today.toDateString()) {
            return locale === 'en' ? 'Today' : 'Hôm nay'
        }

        if (parsedDate.toDateString() === yesterday.toDateString()) {
            return locale === 'en' ? 'Yesterday' : 'Hôm qua'
        }

        const day = parsedDate.getDate()
        const month = parsedDate.getMonth() + 1

        if (locale === 'vi') {
            return `${day} tháng ${month}`
        } else {
            return parsedDate.toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long'
            })
        }
    } catch (error) {
        console.error('Error in formatDayMonth:', error)
        return ''
    }
}

export const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h > 0 ? `${h}h ` : ''}${m}m`
}
