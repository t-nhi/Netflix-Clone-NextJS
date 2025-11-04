import { MiddlewareContext, MiddlewareFn, MiddlewareNext } from '@/middlewares/types.middleware'
import { NextRequest, NextResponse } from 'next/server'

export function createMiddlewareChain(...middlewares: MiddlewareFn[]) {
    return async function handler(req: NextRequest, res: NextResponse): Promise<NextResponse> {
        const ctx: MiddlewareContext = {
            refreshToken: null,
            accessToken: null,
            jwtPayload: null,
            locale: null
        }

        for (let i = 0; i < middlewares.length; i++) {
            const nextCalled = { value: false }

            const next: MiddlewareNext = async (newResponse?: NextResponse) => {
                if (nextCalled.value) throw new Error('next() called multiple times')
                nextCalled.value = true
                if (newResponse) res = newResponse
            }

            const result = await middlewares[i](req, res, next, ctx)

            if (result instanceof NextResponse) return result
            if (nextCalled.value == false) break
        }

        return res
    }
}
