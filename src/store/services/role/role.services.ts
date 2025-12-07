import { HttpMethod } from '@/constants/http.enum'
import baseQueryWithReauth from '@/store/services/client'
import { GetAllRolesResType } from '@/types/dtos/role/getALLRoles.dto'
import { createApi } from '@reduxjs/toolkit/query/react'

export const roleApi = createApi({
    reducerPath: 'roleApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Roles'],
    endpoints: (builder) => ({
        getRoles: builder.query<GetAllRolesResType, void>({
            query: () => ({
                url: '/auth/roles',
                method: HttpMethod.GET
            }),

            providesTags: (result) =>
                result?.data
                    ? [
                          ...result.data.map((role) => ({
                              type: 'Roles' as const,
                              id: role.id
                          })),
                          { type: 'Roles', id: 'LIST' }
                      ]
                    : [{ type: 'Roles', id: 'LIST' }]
        })
    })
})

export const { useGetRolesQuery } = roleApi
