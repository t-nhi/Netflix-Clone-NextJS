import { NextRequest, NextResponse } from 'next/server'
import { MiddlewareContext, MiddlewareFn, MiddlewareNext } from '../types.middleware'
import { buildURLObjWithLocale } from '@/utils/locale.util'

const routesNeedRedirectFromServer = [
    {
        source: '/register/confirm',
        destination: '/signup/registration'
    }
]

const redirectRoutesMiddleware: MiddlewareFn = (
    req: NextRequest,
    res: NextResponse,
    next: MiddlewareNext,
    ctx: MiddlewareContext
) => {
    for (const route of routesNeedRedirectFromServer) {
        if (ctx.cleanPathname === route.source) {
            const newUrl = buildURLObjWithLocale({
                url: route.destination,
                baseUrl: req.url,
                locale: ctx.locale
            })

            req.nextUrl.searchParams.forEach((value, key) => {
                newUrl.searchParams.set(key, value)
            })

            return NextResponse.redirect(newUrl)
        }
    }

    return next()
}

export default redirectRoutesMiddleware
