import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '../client'
import { UploadImageBodyType, UploadImageResType } from '@/types/dtos/upload/uploadImage.dto'
import { HttpMethod } from '@/constants/http.enum'
import { UploadVideoBodyType, UploadVideoResType } from '@/types/dtos/upload/uploadVideo.dto'

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    tagTypes: [],
    refetchOnMountOrArgChange: false,
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        uploadImage: builder.mutation<UploadImageResType, UploadImageBodyType>({
            query: (body) => ({
                url: '/upload-image',
                method: HttpMethod.POST,
                body
            })
        }),
        uploadVideo: builder.mutation<UploadVideoResType, UploadVideoBodyType>({
            query: (body) => ({
                url: '/upload-video',
                method: HttpMethod.POST,
                body
            })
        })
    })
})

export const { useUploadImageMutation, useUploadVideoMutation } = uploadApi
