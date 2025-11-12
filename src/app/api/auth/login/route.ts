import AuthRequestApi from '@/apis/auth.api'
import { HttpMethod } from '@/constants/http.enum'
import { TokenKeys } from '@/constants/token-keys.enum'
import { HttpException } from '@/exceptions/http.exception'
import { InternalException } from '@/exceptions/internalServer.exception'
import { JwtPayloadType } from '@/types/common/jwt-payload.type'
import { setTokenCookie } from '@/utils/cookies.util'
import { decodeJwt } from '@/utils/jwt.util'
import { LoginBodyType } from '@/utils/validation/auth.validation'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as LoginBodyType
        const cookieStore = await cookies()

        const response = await AuthRequestApi.login(body)

        const { access_token, refresh_token } = response.data
        const decodedAccessToken = decodeJwt<JwtPayloadType>(access_token)
        const decodedRefreshToken = decodeJwt<JwtPayloadType>(refresh_token)

        if (!decodedAccessToken || !decodedRefreshToken) {
            throw new Error(' Invalid tokens received from login response.')
        }

        setTokenCookie({
            cookieStore,
            name: TokenKeys.ACCESS_TOKEN,
            token: access_token,
            decodedToken: decodedAccessToken
        })
        setTokenCookie({
            cookieStore,
            name: TokenKeys.REFRESH_TOKEN,
            token: refresh_token,
            decodedToken: decodedRefreshToken
        })

        return NextResponse.json(response)
    } catch (error) {
        if (error instanceof HttpException) {
            return NextResponse.json(error.payload, { status: error.status })
        } else {
            console.error('Login error:', error)
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during login.'

            const internalException = new InternalException({
                detail: errorMessage,
                method: HttpMethod.POST,
                path: request.url
            })

            return NextResponse.json(internalException.payload, { status: internalException.status })
        }
    }
}
