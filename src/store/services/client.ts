import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { RootState } from '@/store'
import { HttpMethod, HttpStatusCode } from '@/constants/http.enum'
import { RefreshTokenResType } from '@/types/dtos/auth/refreshToken.dto'
import { setAccessToken, setLoggedOutAction } from '../features/authSlice'
import { envConfig } from '@/config/env.config'

const mutex = new Mutex()

export const backendBaseQuery = fetchBaseQuery({
    baseUrl: envConfig.NEXT_PUBLIC_API_ENDPOINT,
    prepareHeaders: async (headers, api) => {
        if (headers.has('authorization')) return headers

        const token = (api.getState() as RootState).auth.access_token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const proxyAuthBaseQuery = fetchBaseQuery({ baseUrl: '' })

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = retry(
    async (args, api, extraOptions) => {
        await mutex.waitForUnlock()
        let result = await backendBaseQuery(args, api, extraOptions)
        if (result.error && result.error.status === HttpStatusCode.UNAUTHORIZED) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire()
                try {
                    const refreshResult = await proxyAuthBaseQuery(
                        { url: '/api/auth/refresh-token', method: HttpMethod.POST },
                        api,
                        extraOptions
                    )
                    const response = refreshResult.data as RefreshTokenResType
                    if (response) {
                        const { access_token } = response.data
                        api.dispatch(setAccessToken(access_token))
                        result = await backendBaseQuery(args, api, extraOptions)
                    } else {
                        await proxyAuthBaseQuery(
                            { url: '/api/auth/logout', method: HttpMethod.POST },
                            api,
                            extraOptions
                        )
                        api.dispatch(setLoggedOutAction())
                    }
                } finally {
                    release()
                }
            } else {
                await mutex.waitForUnlock()
                result = await backendBaseQuery(args, api, extraOptions)
            }
        }
        return result
    },
    {
        maxRetries: 5
    }
)

export default baseQueryWithReauth
