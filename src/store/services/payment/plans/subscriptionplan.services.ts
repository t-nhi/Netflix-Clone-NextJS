import { createApi } from '@reduxjs/toolkit/query/react'
import { HttpMethod } from '@/constants/http.enum'
import { GetAllPlansResType } from '@/types/dtos/payment/plans/subscription.dto'
import { backendBaseQuery } from '@/store/services/client'
import { SubscriptionPlanType } from '@/types/models/subscription.model'

export const subscriptionApi = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: backendBaseQuery,
    refetchOnMountOrArgChange: false,
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    tagTypes: ['SubscriptionPlan'],

    endpoints: (builder) => ({
        getAllPlans: builder.query<GetAllPlansResType, void>({
            query: () => ({
                url: '/subscription-plans',
                method: HttpMethod.GET
            }),
            providesTags: (result) => {
                const tags = result
                    ? result.data.map((plan: SubscriptionPlanType) => ({
                          type: 'SubscriptionPlan' as const,
                          id: plan.id
                      }))
                    : []

                tags.push({ type: 'SubscriptionPlan', id: 'LIST' })
                return tags
            }
        })
    })
})

export const { useGetAllPlansQuery } = subscriptionApi
