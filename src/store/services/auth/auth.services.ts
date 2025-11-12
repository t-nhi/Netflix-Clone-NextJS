import { createApi } from '@reduxjs/toolkit/query/react'
import { VerifyEmailBodyType, VerifyEmailResType } from '@/types/dtos/auth/verifyEmail.dto'
import { HttpMethod } from '@/constants/http.enum'
import { VerifyTokenBodyType, VerifyTokenResType } from '@/types/dtos/auth/verifyToken.dto'
import { ForgotPasswordBodyType, ForgotPasswordResType } from '@/types/dtos/auth/forgotPassword.dto'
import { ResetPasswordBodyType, ResetPasswordResType } from '@/types/dtos/auth/resetPassword.dto'
import { backendBaseQuery } from '../client'

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
        forgotPassword: builder.mutation<ForgotPasswordResType, ForgotPasswordBodyType>({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: HttpMethod.POST,
                body
            })
        }),
        resetPassword: builder.mutation<ResetPasswordResType, ResetPasswordBodyType>({
            query: (body) => ({
                url: '/auth/reset-password',
                method: HttpMethod.POST,
                body
            })
        }),
        verifyOtp: builder.mutation<VerifyTokenResType, VerifyTokenBodyType>({
            query: (body) => ({
                url: '/auth/verify-otp',
                method: HttpMethod.POST,
                body
            })
        })
    })
})

export const {
    useVerifyEmailMutation,
    useVerifyTokenMutation,
    useResetPasswordMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation
} = authApi
