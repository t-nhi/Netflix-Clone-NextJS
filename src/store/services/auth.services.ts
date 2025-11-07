import { createApi } from '@reduxjs/toolkit/query/react'
import { backendBaseQuery } from './client'
import { VerifyEmailBodyType, VerifyEmailResType } from '@/types/dtos/auth/verifyEmail.dto'
import { HttpMethod } from '@/constants/http.enum'
import { VerifyTokenBodyType, VerifyTokenResType } from '@/types/dtos/auth/verifyToken.dto'
import { ChangePasswordBodyType, ChangePasswordResType } from '@/types/dtos/auth/changePassword.dto'

export const authApi = createApi({
    baseQuery: backendBaseQuery,
    reducerPath: 'AuthApi',
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        verifyEmail: builder.mutation<VerifyEmailResType, VerifyEmailBodyType>({
            query: (body) => ({
                url: '/auth/verify-email',
                method: HttpMethod.POST,
                body
            })
        }),
        verifyToken: builder.mutation<VerifyTokenResType, VerifyTokenBodyType>({
            query: (body) => ({
                url: '/auth/verify-token',
                method: HttpMethod.POST,
                body
            })
        }),
        changePasswordBodySchema: builder.mutation<ChangePasswordResType, ChangePasswordBodyType>({
            query: (body) => ({
                url: '/auth/change-password',
                method: HttpMethod.POST,
                body
            })
        })
    })
})

export const { useVerifyEmailMutation, useVerifyTokenMutation, useChangePasswordBodySchemaMutation } = authApi
