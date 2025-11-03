import httpClient from '@/apis/client'
import clientSessionToken from '@/services/storage/clientSessionToken'
import { JwtPayload } from '@/types/common/jwt-payload.type'
import { RefreshTokenRes } from '@/types/response/auth.type'
import { decodeJwt } from '@/utils/jwt.util'

/**
 * Handles the refresh token logic.
 * If the access token is expired or about to expire, it fetches a new access token using the refresh token.
 * If the refresh token is also expired, it clears the session tokens.
 * @param {Object} params - Optional parameters for success and error callbacks.
 * @param {Function} params.onSuccess - Callback function to execute on successful token refresh.
 * @param {Function} params.onError - Callback function to execute on error during token refresh.
 * @param {Function} params.onRefreshTokenExpired - Callback function to execute when the refresh token is expired.
 */

export async function handleRefreshToken(params?: {
    onSuccess?: (data: RefreshTokenRes) => void
    onError?: (error: unknown) => void
    onRefreshTokenExpired?: () => void
    force?: boolean
}) {
    const accessToken = clientSessionToken.getAccessToken()
    const refreshToken = clientSessionToken.getRefreshToken()
    if (!accessToken || !refreshToken) return

    const decodeAccessToken = decodeJwt<JwtPayload>(accessToken)
    const decodeRefreshToken = decodeJwt<JwtPayload>(refreshToken)

    if (!decodeAccessToken || !decodeRefreshToken) params?.onError?.(new Error('Failed to decode tokens'))

    const currentTime = Date.now() / 1000 - 1
    if (decodeRefreshToken.exp <= currentTime) {
        return params?.onRefreshTokenExpired?.()
    }

    if (!params?.force && decodeAccessToken.exp - currentTime > (decodeAccessToken.exp - decodeAccessToken.iat) / 3)
        return

    try {
        const res = await httpClient.post<RefreshTokenRes>('/api/auth/refresh-token', null, {
            baseUrl: ''
        })
        params?.onSuccess?.(res)
    } catch (error) {
        params?.onError?.(error)
    }
}
