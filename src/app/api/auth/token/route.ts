import { HttpMethod, HttpStatusCode } from '@/constants/http.enum'
import { HttpException } from '@/exceptions/http.exception'
import { InternalException } from '@/exceptions/internalServer.exception'
import { JwtPayloadType } from '@/types/common/jwt-payload.type'
import { UpdateCookieTokenBodyType } from '@/types/dtos/auth/updateCookieToken.dto'
import { decodeJwt } from '@/utils/jwt.util'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as UpdateCookieTokenBodyType
        const cookieStory = await cookies()

        const { access_token, refresh_token } = body
        if (!access_token || !refresh_token) {
            throw new HttpException({
                payload: {
                    detail: ' Missing tokens in request body.',
                    method: HttpMethod.POST,
                    path: request.url,
                    title: 'Bad Request'
                },
                status: HttpStatusCode.BAD_REQUEST
            })
        }
        const decodedAccessToken = decodeJwt<JwtPayloadType>(access_token)
        const decodedRefreshToken = decodeJwt<JwtPayloadType>(refresh_token)

        if (!decodedAccessToken || !decodedRefreshToken) {
            throw new HttpException({
                payload: {
                    detail: ' Invalid tokens provided.',
                    method: HttpMethod.POST,
                    path: request.url,
                    title: 'Unauthorized'
                },
                status: HttpStatusCode.UNAUTHORIZED
            })
        }
        cookieStory.set('access_token', access_token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(decodedAccessToken.exp * 1000),
            secure: true,
            path: '/'
        })
        cookieStory.set('refresh_token', refresh_token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(decodedRefreshToken.exp * 1000),
            secure: true,
            path: '/'
        })
        return NextResponse.json(body)
    } catch (error) {
        if (error instanceof HttpException) {
            return NextResponse.json(error.payload, { status: error.status })
        } else {
            console.error('Login error:', error)
            const detailError =
                error instanceof Error ? error.message : 'An unexpected error occurred while updating tokens.'

            const internalException = new InternalException({
                detail: detailError,
                method: HttpMethod.POST,
                path: request.url
            })
            return NextResponse.json(internalException.payload, { status: internalException.status })
        }
    }
}
