import httpClient from '@/apis/httpClient'
import clientSessionToken from '@/services/storage/clientSessionToken'
import { JwtPayloadType } from '@/types/common/jwt-payload.type'
import { RefreshTokenResType } from '@/types/dtos/auth/refreshToken.dto'
import { decodeJwt } from '@/utils/jwt.util'

export async function handleRefreshToken(params?: {
    onSuccess?: (data: RefreshTokenResType) => void
    onError?: (error: unknown) => void
    onRefreshTokenExpired?: () => void
    force?: boolean
}) {
    const accessToken = clientSessionToken.getAccessToken()
    const refreshToken = clientSessionToken.getRefreshToken()
    if (!accessToken || !refreshToken) return

    const decodeAccessToken = decodeJwt<JwtPayloadType>(accessToken)
    const decodeRefreshToken = decodeJwt<JwtPayloadType>(refreshToken)

    if (!decodeAccessToken || !decodeRefreshToken) return params?.onError?.(new Error('Failed to decode tokens'))

    const currentTime = Date.now() / 1000 - 1
    if (decodeRefreshToken.exp <= currentTime) {
        return params?.onRefreshTokenExpired?.()
    }

    if (!params?.force && decodeAccessToken.exp - currentTime > (decodeAccessToken.exp - decodeAccessToken.iat) / 3)
        return

    try {
        const res = await httpClient.post<RefreshTokenResType>('/api/auth/refresh-token', null, {
            baseUrl: ''
        })
        params?.onSuccess?.(res)
    } catch (error) {
        params?.onError?.(error)
    }
}
