import { CookieKeys } from '@/constants/cookie-keys.constant'
import { NextRequest } from 'next/server'

export function getTokens(request: NextRequest) {
    'use server'
    const access_token = request.cookies.get(CookieKeys.ACCESS_TOKEN)?.value
    const refresh_token = request.cookies.get(CookieKeys.REFRESH_TOKEN)?.value
    return { access_token, refresh_token }
}
