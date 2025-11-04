import { HEADER_I18N, i18nConfig, localesType } from '@/i18n/i18n-config'
import { MiddlewareContext, MiddlewareFn, MiddlewareNext } from '@/middlewares/types.middleware'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const i18nMiddleware: MiddlewareFn = (
    req: NextRequest,
    res: NextResponse,
    next: MiddlewareNext,
    ctx: MiddlewareContext
) => {
    const defaultLocale = (req.headers.get(HEADER_I18N) || i18nConfig.defaultLocale) as localesType
    const i18n = createMiddleware({ locales: i18nConfig.locales, defaultLocale })
    const response = i18n(req)

    response.headers.set(HEADER_I18N, defaultLocale)
    ctx.locale = defaultLocale

    return next(response)
}

export default i18nMiddleware
