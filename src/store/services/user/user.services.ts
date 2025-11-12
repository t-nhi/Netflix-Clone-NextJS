import { createApi } from '@reduxjs/toolkit/query/react'
import { ChangePasswordBodyType, ChangePasswordResType } from '@/types/dtos/auth/changePassword.dto'
import { HttpMethod } from '@/constants/http.enum'
import baseQueryWithReauth from '../client'

export const userApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    refetchOnMountOrArgChange: false,
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        changePassword: builder.mutation<ChangePasswordResType, ChangePasswordBodyType>({
            query: (data) => ({
                url: '/auth/change-password',
                method: HttpMethod.PATCH,
                body: data
            })
        })
    })
})

export const { useChangePasswordMutation } = userApi
