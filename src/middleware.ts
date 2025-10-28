import { NextRequest, NextResponse } from 'next/server'
import composeMiddlewares from '@/middlewares'

export function middleware(request: NextRequest) {
    const middlewareChain = composeMiddlewares()

    return middlewareChain(request, NextResponse.next())
}

export const config = {
    matcher: ['/', '/(vi|en)/:path*']
}
