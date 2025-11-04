import { NextRequest, NextResponse } from 'next/server'
import composeMiddlewares from '@/middlewares'
import { i18nConfig } from '@/i18n/i18n-config'

export function middleware(request: NextRequest) {
    const middlewareChain = composeMiddlewares()

    return middlewareChain(request, NextResponse.next())
}

export const config = {
    matcher: ['/', `/(${i18nConfig.locales.join('|')})/:path*`]
}
