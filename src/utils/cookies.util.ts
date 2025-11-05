import { TokenKeys } from '@/constants/token-keys.enum'
import { JwtPayload } from '@/types/common/jwt-payload.type'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export function getTokensFromCookies(cookies: ReadonlyRequestCookies | RequestCookies) {
    const access_token = cookies.get(TokenKeys.ACCESS_TOKEN)?.value
    const refresh_token = cookies.get(TokenKeys.REFRESH_TOKEN)?.value
    return { access_token, refresh_token }
}

export function deleteTokenCookies(cookieStore: RequestCookies | ReadonlyRequestCookies) {
    cookieStore.delete(TokenKeys.ACCESS_TOKEN)
    cookieStore.delete(TokenKeys.REFRESH_TOKEN)
}

interface SetTokenCookieParams {
    cookieStore: ReadonlyRequestCookies
    name: TokenKeys
    token: string
    decodedToken: JwtPayload
}
export function setTokenCookie({ cookieStore, name, token, decodedToken }: SetTokenCookieParams) {
    cookieStore.set(name, token, {
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(decodedToken.exp * 1000),
        secure: true,
        path: '/'
    })
}
