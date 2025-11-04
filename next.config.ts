import { i18nConfig } from '@/i18n/i18n-config'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
    async rewrites() {
        return i18nConfig.locales.map((locale) => ({
            source: `/${locale}`,
            destination: `/${locale}/home`
        }))
    }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
