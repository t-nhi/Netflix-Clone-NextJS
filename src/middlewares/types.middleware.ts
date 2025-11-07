import { localesType } from '@/i18n/i18n-config'
import { JwtPayload } from '@/types/common/jwt-payload.type'
import { NextRequest, NextResponse } from 'next/server'

export type MiddlewareContext = {
    refreshToken: string | null
    accessToken: string | null
    jwtPayload: JwtPayload | null
    locale: localesType | null
    cleanPathname: string | null
    [key: string]: any
}

export type MiddlewareNext = (res?: NextResponse) => void | Promise<void>
export type MiddlewareFn = (
    req: NextRequest,
    res: NextResponse,
    next: MiddlewareNext,
    ctx: MiddlewareContext
) => Promise<NextResponse> | NextResponse | void | Promise<void>
