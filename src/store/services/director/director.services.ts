import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '../client'
import { HttpMethod } from '@/constants/http.enum'
import { GetAllDirectorResType } from '@/types/dtos/director/getListDirector.dto'
import { GetDirectorDetailParamsType, GetDirectorDetailResType } from '@/types/dtos/director/getDirectorDetail.dto'
import {
    UpdateDirectorBodyType,
    UpdateDirectorParamsType,
    UpdateDirectorResType
} from '@/types/dtos/director/updateDirector.dto'
import { CreateDirectorBodyType, CreateDirectorResType } from '@/types/dtos/director/createDirector.dto'

export const directorApi = createApi({
    reducerPath: 'ManageDirectorApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Directors'],
    refetchOnMountOrArgChange: false,
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    endpoints(build) {
        return {
            getAllDirectors: build.query<GetAllDirectorResType, void>({
                query: () => ({
                    url: '/directors',
                    method: HttpMethod.GET
                }),
                providesTags: (result, error, arg) => {
                    if (result?.data) {
                        return [
                            ...result.data.map((director) => ({
                                type: 'Directors' as const,
                                id: director.id
                            })),
                            { type: 'Directors' as const, id: 'LIST' }
                        ]
                    } else {
                        return [{ type: 'Directors' as const, id: 'LIST' }]
                    }
                }
            }),
            getDirectorById: build.query<GetDirectorDetailResType, GetDirectorDetailParamsType>({
                query: (params) => ({
                    url: `/directors/${params.id}`,
                    method: HttpMethod.GET
                }),
                providesTags: (result, error, arg) => [{ type: 'Directors' as const, id: arg.id }]
            }),
            updateDirectorById: build.mutation<
                UpdateDirectorResType,
                { body: UpdateDirectorBodyType; params: UpdateDirectorParamsType }
            >({
                query: ({ body, params }) => ({
                    url: `/directors/${params.id}`,
                    method: HttpMethod.PUT,
                    body
                }),
                invalidatesTags: (result, error, arg) => [{ type: 'Directors' as const, id: arg.params.id }]
            }),
            createDirector: build.mutation<CreateDirectorResType, CreateDirectorBodyType>({
                query: (body) => ({
                    url: '/directors',
                    method: HttpMethod.POST,
                    body
                }),
                invalidatesTags: [{ type: 'Directors' as const, id: 'LIST' }]
            }),
            deleteDirector: build.mutation<void, { params: { id: string } }>({
                query: (params) => ({
                    url: `/directors/${params.params.id}`,
                    method: HttpMethod.DELETE
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Directors', id: arg.params.id },
                    { type: 'Directors' as const, id: 'LIST' }
                ]
            })
        }
    }
})

export const {
    useGetAllDirectorsQuery,
    useGetDirectorByIdQuery,
    useUpdateDirectorByIdMutation,
    useCreateDirectorMutation,
    useDeleteDirectorMutation
} = directorApi
