import AuthRequestApi from '@/apis/auth.api'
import { HttpMethod, HttpStatusCode } from '@/constants/http.enum'
import { TokenKeys } from '@/constants/token-keys.enum'
import { HttpException } from '@/exceptions/http.exception'
import { InternalException } from '@/exceptions/internalServer.exception'
import { UnauthorizedException } from '@/exceptions/unauthorized.exception'
import { getTokensFromCookies, setTokenCookie } from '@/utils/cookies.util'
import { decodeJwt } from '@/utils/jwt.util'
import { JwtPayloadType } from '@/types/common/jwt-payload.type'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies()
        const refresh_token = getTokensFromCookies(cookieStore).refresh_token

        if (!refresh_token) {
            throw new UnauthorizedException({
                detail: 'Refresh token is missing.',
                method: HttpMethod.POST,
                path: request.url
            })
        }

        const response = await AuthRequestApi.refreshToken({
            refresh_token
        })

        const { access_token } = response.data
        const decodedAccessToken = decodeJwt<JwtPayloadType>(access_token)

        if (!decodedAccessToken) {
            throw new UnauthorizedException({
                detail: 'Invalid access token received from server.',
                method: HttpMethod.POST,
                path: request.url
            })
        }

        setTokenCookie({
            cookieStore,
            name: TokenKeys.ACCESS_TOKEN,
            token: access_token,
            decodedToken: decodedAccessToken
        })
        return NextResponse.json(response, { status: HttpStatusCode.OK })
    } catch (error) {
        if (error instanceof HttpException) {
            return NextResponse.json(error.payload, { status: error.status })
        } else {
            console.error('Refresh token error:', error)
            const message =
                error instanceof Error ? error.message : 'An unexpected error occurred during refresh token.'
            const internalException = new InternalException({
                detail: message,
                method: HttpMethod.POST,
                path: request.url
            })
            return NextResponse.json(internalException.payload, { status: internalException.status })
        }
    }
}
