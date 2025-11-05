import { createApi } from '@reduxjs/toolkit/query/react'
import { proxyAuthBaseQuery } from './client'
import { LoginResType } from '@/types/dtos/auth/login.dto'
import { LoginBodyType } from '@/utils/validation/auth.validation'
import { HttpMethod } from '@/constants/http.enum'
import { LogoutResType } from '@/types/dtos/auth/logout.dto'
import { SignUpBodyType, SignUpResType } from '@/types/dtos/auth/signUp.dto'
import { RefreshTokenResType } from '@/types/dtos/auth/refreshToken.dto'
import { UpdateCookieTokenBodyType } from '@/types/dtos/auth/updateCookieToken.dto'

export const AuthApi = createApi({
    baseQuery: proxyAuthBaseQuery,
    reducerPath: 'AuthApi',
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResType, LoginBodyType>({
            query: (body) => ({
                url: '/api/auth/login',
                method: HttpMethod.POST,
                body
            })
        }),
        logout: builder.mutation<LogoutResType, void>({
            query: () => ({
                url: '/api/auth/logout',
                method: HttpMethod.POST
            })
        }),
        register: builder.mutation<SignUpResType, SignUpBodyType>({
            query: (body) => ({
                url: '/api/auth/register',
                method: HttpMethod.POST,
                body
            })
        }),
        refreshToken: builder.mutation<RefreshTokenResType, void>({
            query: () => ({
                url: '/api/auth/refresh-token',
                method: HttpMethod.POST
            })
        }),
        setTokens: builder.mutation<void, UpdateCookieTokenBodyType>({
            query: (body) => ({
                url: '/api/auth/token',
                method: HttpMethod.POST,
                body
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
    useSetTokensMutation
} = AuthApi
