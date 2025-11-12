import AuthRequestApi from '@/apis/auth.api'
import { HttpStatusCode, HttpStatusMessage } from '@/constants/http.enum'
import { HttpResponse } from '@/types/common/http-response.type'
import { deleteTokenCookies, getTokensFromCookies } from '@/utils/cookies.util'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const { access_token, refresh_token } = getTokensFromCookies(cookieStore)
    deleteTokenCookies(cookieStore)

    const httpResponsePayload: HttpResponse = {
        status: HttpStatusMessage.SUCCESS,
        message: 'Logged out successfully.',
        method: 'POST',
        path: request.url
    }

    if (!access_token || !refresh_token) {
        return NextResponse.json(
            {
                ...httpResponsePayload,
                message: 'No tokens found. User already logged out.'
            },
            { status: HttpStatusCode.OK }
        )
    }
    try {
        const response = await AuthRequestApi.logout({
            refresh_token,
            access_token
        })
        return NextResponse.json(response, { status: HttpStatusCode.OK })
    } catch (error) {
        console.error('Logout error:', error)
        const message = error instanceof Error ? error.message : 'An unexpected error occurred during logout.'
        return NextResponse.json({ ...httpResponsePayload, message }, { status: HttpStatusCode.OK })
    }
}
