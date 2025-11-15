import { createApi } from '@reduxjs/toolkit/query/react'
import { GetAllActorResType } from '@/types/dtos/actor/getListActor.dto'
import baseQueryWithReauth from '../client'
import { HttpMethod } from '@/constants/http.enum'
import { GetActorDetailParamsType, GetActorDetailResType } from '@/types/dtos/actor/getActorDetail.dto'
import { UpdateActorBodyType, UpdateActorParamsType, UpdateActorResType } from '@/types/dtos/actor/updateActor.dto'
import { CreateActorBodyType, CreateActorResType } from '@/types/dtos/actor/createActor.dto'
import { DeleteActorParamType, DeleteActorResType } from '@/types/dtos/actor/deleteActor.dto'

export const actorApi = createApi({
    reducerPath: 'ManageActorApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Actors'],
    refetchOnMountOrArgChange: false,
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    endpoints(build) {
        return {
            getAllActors: build.query<GetAllActorResType, void>({
                query: () => ({
                    url: '/actors',
                    method: HttpMethod.GET
                }),
                providesTags: (result, error, arg) => {
                    if (result?.data) {
                        return [
                            ...result.data.map((actor) => ({
                                type: 'Actors' as const,
                                id: actor.id
                            })),
                            { type: 'Actors' as const, id: 'LIST' }
                        ]
                    } else {
                        return [{ type: 'Actors' as const, id: 'LIST' }]
                    }
                }
            }),
            getActorById: build.query<GetActorDetailResType, { params: GetActorDetailParamsType }>({
                query: (params) => ({
                    url: `/actors/${params.params.id}`,
                    method: HttpMethod.GET
                }),
                providesTags: (result, error, arg) => [{ type: 'Actors' as const, id: arg.params.id }]
            }),
            updateActorById: build.mutation<
                UpdateActorResType,
                { body: UpdateActorBodyType; params: UpdateActorParamsType }
            >({
                query: ({ body, params }) => ({
                    url: `/actors/${params.id}`,
                    method: HttpMethod.PATCH,
                    body
                }),
                invalidatesTags: (result, error, arg) => [{ type: 'Actors' as const, id: arg.params.id }]
            }),
            deleteActor: build.mutation<DeleteActorResType, { params: DeleteActorParamType }>({
                query: ({ params }) => ({
                    url: `/actors/${params.id}`,
                    method: HttpMethod.DELETE
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Actors', id: arg.params.id },
                    { type: 'Actors', id: 'LIST' }
                ]
            }),
            createActor: build.mutation<CreateActorResType, CreateActorBodyType>({
                query: (body) => ({
                    url: '/actors',
                    method: HttpMethod.POST,
                    body
                }),
                invalidatesTags: [{ type: 'Actors', id: 'LIST' }]
            })
        }
    }
})

export const {
    useGetAllActorsQuery,
    useGetActorByIdQuery,
    useUpdateActorByIdMutation,
    useDeleteActorMutation,
    useCreateActorMutation
} = actorApi
