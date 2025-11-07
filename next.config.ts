import { i18nConfig } from '@/i18n/i18n-config'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { Rewrite } from 'next/dist/lib/load-custom-routes'

const routesNeedRewrite: Rewrite[] = [
    {
        source: '/',
        destination: '/home'
    },
    {
        source: '/signup',
        destination: '/signup/verify-email'
    },
    {
        source: '/admin',
        destination: '/admin/movies/add'
    }
]

const nextConfig: NextConfig = {
    async rewrites() {
        return i18nConfig.locales.flatMap((locale) =>
            routesNeedRewrite.map((rule) => {
                const isRoot = rule.source === '/'
                return {
                    source: isRoot ? `/${locale}` : `/${locale}${rule.source}`,
                    destination: `/${locale}${rule.destination}`
                }
            })
        )
    }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
