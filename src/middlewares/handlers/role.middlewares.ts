import { AdminPaths, CommonPaths, isPathIncluded, UserPaths } from '@/config/routes.config'
import { Role } from '@/constants/role.enum'
import { MiddlewareContext, MiddlewareFn, MiddlewareNext } from '@/middlewares/types.middleware'
import { JwtPayload } from '@/types/common/jwt-payload.type'
import { decodeJwt } from '@/utils/jwt.util'
import { buildURLObjWithLocale } from '@/utils/locale.util'
import { NextRequest, NextResponse } from 'next/server'

const RoleAccessMiddleware: MiddlewareFn = (
    req: NextRequest,
    res: NextResponse,
    next: MiddlewareNext,
    ctx: MiddlewareContext
) => {
    if (ctx.refreshToken == null) return next()

    const { pathname } = req.nextUrl

    const decodedToken = decodeJwt<JwtPayload>(ctx.refreshToken)
    ctx.jwtPayload = decodedToken

    const unauthorizedRedirect = NextResponse.redirect(
        buildURLObjWithLocale({
            url: CommonPaths.HOME,
            baseUrl: req.url,
            locale: ctx.locale
        })
    )

    if (decodedToken == null) return unauthorizedRedirect

    const isAdminPath = isPathIncluded([...Object.values(AdminPaths)], pathname)
    if (isAdminPath && decodedToken.role != Role.ADMIN) {
        return unauthorizedRedirect
    }

    const isUserPath = isPathIncluded([...Object.values(UserPaths)], pathname)
    if (isUserPath && decodedToken.role != Role.USER) {
        return unauthorizedRedirect
    }

    return next()
}

export default RoleAccessMiddleware
