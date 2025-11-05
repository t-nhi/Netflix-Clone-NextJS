import { TokenKeys } from '@/constants/token-keys.enum'
import { NextRequest } from 'next/server'

export function getTokensFromCookies(request: NextRequest) {
    'use server'
    const access_token = request.cookies.get(TokenKeys.ACCESS_TOKEN)?.value
    const refresh_token = request.cookies.get(TokenKeys.REFRESH_TOKEN)?.value
    return { access_token, refresh_token }
}
