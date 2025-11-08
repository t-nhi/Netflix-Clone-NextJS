import { AdminPaths, AuthPaths, CommonPaths, UnauthPaths, UserPaths, isPathIncluded } from '@/config/routes.config'
import { QueryKeys } from '@/constants/query-keys.constant'
import { MiddlewareContext, MiddlewareFn, MiddlewareNext } from '@/middlewares/types.middleware'
import { getTokensFromCookies } from '@/utils/cookies.util'
import { buildURLObjWithLocale } from '@/utils/locale.util'
import { NextRequest, NextResponse } from 'next/server'

const AuthenticationMiddleware: MiddlewareFn = (
    req: NextRequest,
    res: NextResponse,
    next: MiddlewareNext,
    ctx: MiddlewareContext
) => {
    const { pathname } = req.nextUrl

    const cookiesStore = req.cookies
    const { refresh_token, access_token } = getTokensFromCookies(cookiesStore)

    ctx.refreshToken = refresh_token ?? null
    ctx.accessToken = access_token ?? null

    const isAuthenticated = !!refresh_token
    const isAccessTokenValid = !!access_token

    if (isAuthenticated && !isAccessTokenValid && ctx.cleanPathname !== AuthPaths.REFRESH_TOKEN) {
        console.log('Access token is missing or invalid, redirecting to refresh token endpoint.')
        const url = buildURLObjWithLocale({
            url: AuthPaths.REFRESH_TOKEN,
            baseUrl: req.url,
            locale: ctx.locale
        })
        url.searchParams.set(QueryKeys.REFRESH_TOKEN, refresh_token!)
        url.searchParams.set(QueryKeys.REDIRECT, pathname)
        return NextResponse.redirect(url)
    }

    const isPrivatePath = isPathIncluded(
        [...Object.values(AdminPaths), ...Object.values(UserPaths)],
        ctx.cleanPathname!
    )

    if (isPrivatePath && !isAuthenticated) {
        const url = buildURLObjWithLocale({
            url: UnauthPaths.LOGIN,
            baseUrl: req.url,
            locale: ctx.locale
        })
        url.searchParams.set(QueryKeys.CLEAR_TOKEN, 'true')
        url.searchParams.set(QueryKeys.REDIRECT, pathname)
        return NextResponse.redirect(url)
    }

    const isUnauthPath = isPathIncluded(Object.values(UnauthPaths), ctx.cleanPathname!)

    if (isUnauthPath && isAuthenticated) {
        const redirectFrom = req.nextUrl.searchParams.get(QueryKeys.REDIRECT)
        const redirectUrl = redirectFrom ? redirectFrom : CommonPaths.HOME

        const url = buildURLObjWithLocale({
            url: redirectUrl,
            baseUrl: req.url,
            locale: ctx.locale
        })

        return NextResponse.redirect(url)
    }

    return next()
}

export default AuthenticationMiddleware
