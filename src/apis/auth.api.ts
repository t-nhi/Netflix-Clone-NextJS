import httpClient from './httpClient'
import { LogoutBodyType, LogoutResType } from '@/types/dtos/auth/logout.dto'
import { ForgotPasswordBodyType, ForgotPasswordResType } from '@/types/dtos/auth/forgotPassword.dto'
import { VerifyEmailBodyType, VerifyEmailResType } from '@/types/dtos/auth/verifyEmail.dto'
import { LoginBodyType, LoginResType } from '@/types/dtos/auth/login.dto'
import { SignUpBodyType, SignUpResType } from '@/types/dtos/auth/signUp.dto'
import { VerifyOtpBodyType, VerifyOtpResType } from '@/types/dtos/auth/verifyOtp.dto'
import { RefreshTokenBodyType, RefreshTokenResType } from '@/types/dtos/auth/refreshToken.dto'
import { ResetPasswordBodyType, ResetPasswordResType } from '@/types/dtos/auth/resetPassword.dto'
import { VerifyAccountBodyType, VerifyAccountResType } from '@/types/dtos/auth/verifyAccount.dto'
import { VerifyTokenBodyType, VerifyTokenResType } from '@/types/dtos/auth/verifyToken.dto'

const AuthRequestApi = {
    login: (body: LoginBodyType) => httpClient.post<LoginResType>('/auth/login', body),
    verifyEmail: (body: VerifyEmailBodyType) => httpClient.post<VerifyEmailResType>('/auth/verify-email', body),
    signUp: (body: SignUpBodyType) => httpClient.post<SignUpResType>('/auth/siÂQgn-up', body),
    logout: (data: LogoutBodyType & { access_token: string }) => {
        const { access_token, ...body } = data
        return httpClient.post<LogoutResType>('/auth/log-out', body, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
    },
    refreshToken: (body: RefreshTokenBodyType) => {
        return httpClient.post<RefreshTokenResType>('/auth/refresh-token', body)
    },
    forgotPassword: (body: ForgotPasswordBodyType) =>
        httpClient.post<ForgotPasswordResType>('/auth/forgot-password', body),
    verifyOtp: (body: VerifyOtpBodyType) => httpClient.post<VerifyOtpResType>('/auth/verify-otp', body),
    resetPassword: (body: ResetPasswordBodyType) => httpClient.post<ResetPasswordResType>('/auth/reset-password', body),
    verifyAccount: (body: VerifyAccountBodyType) => httpClient.post<VerifyAccountResType>('/auth/verify-account', body),
    verifyToken: (body: VerifyTokenBodyType) => httpClient.post<VerifyTokenResType>('/auth/verify-token', body)
}

export default AuthRequestApi
