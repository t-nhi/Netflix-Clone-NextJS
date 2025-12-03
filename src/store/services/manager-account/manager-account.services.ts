import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '../client'
import { HttpMethod } from '@/constants/http.enum'
import { GetAllAccountResType } from '@/types/dtos/manager-account/getAllAccounts.dto'

export const accountApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'accountApi',
    tagTypes: ['Accounts'],
    refetchOnMountOrArgChange: false,
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getAllAccounts: build.query<GetAllAccountResType, void>({
            query: () => ({
                url: '/auth/accounts',
                method: HttpMethod.GET
            }),
            providesTags: (result) => {
                if (result?.data) {
                    return [
                        ...result.data.map((user) => ({
                            type: 'Accounts' as const,
                            id: user.id
                        })),
                        { type: 'Accounts' as const, id: 'LIST' }
                    ]
                }
                return [{ type: 'Accounts', id: 'LIST' }]
            }
        }),
        banAccount: build.mutation<void, { params: { id: string } }>({
            query: ({ params }) => ({
                url: `/auth/accounts/${params.id}/ban`,
                method: HttpMethod.PATCH
            })
        }),
        unlockAccount: build.mutation<void, { params: { id: string } }>({
            query: ({ params }) => ({
                url: `/auth/accounts/${params.id}/unlock`,
                method: HttpMethod.PATCH
            })
        }),
        getAccountsByStatus: build.query<GetAllAccountResType, boolean>({
            query: (isEnabled) => ({
                url: `/auth/accounts/status`,
                method: HttpMethod.GET,
                params: { is_enabled: isEnabled }
            })
        }),
        getAccountsByRole: build.query<GetAllAccountResType, string>({
            query: (roleId: string) => ({
                url: `/auth/accounts/role/${roleId}`,
                method: HttpMethod.GET
            }),
            providesTags: ['Accounts']
        })
    })
})

export const {
    useGetAllAccountsQuery,
    useBanAccountMutation,
    useUnlockAccountMutation,
    useGetAccountsByRoleQuery,
    useGetAccountsByStatusQuery
} = accountApi
