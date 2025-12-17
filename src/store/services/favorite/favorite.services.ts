import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '../client'
import { HttpMethod } from '@/constants/http.enum'
import { GetFavoriteListQueryParamsType, GetFavoriteListResType } from '@/types/dtos/favorite/getFavoritesMovie.dto'
import { AddFavoriteBodyType, AddFavoriteResType } from '@/types/dtos/favorite/addMovieToFavorite.dto'
import { RemoveFavoriteParamsType, RemoveFavoriteResType } from '@/types/dtos/favorite/deleteFavoriteMovie.dto'

export const favoriteApi = createApi({
    reducerPath: 'favoriteApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Favorite', 'Movie'],
    endpoints: (builder) => ({
        getCustomerFavorites: builder.query<GetFavoriteListResType, GetFavoriteListQueryParamsType | void>({
            query: (params) => {
                const searchParams = new URLSearchParams()

                if (params) {
                    if (params.page) searchParams.append('page', params.page.toString())
                    if (params.limit) searchParams.append('limit', params.limit.toString())
                }

                const queryString = searchParams.toString()
                const url = queryString ? `/customers/favorites?${queryString}` : '/customers/favorites'

                return {
                    url: url,
                    method: HttpMethod.GET
                }
            },

            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map((movie) => ({
                              type: 'Favorite' as const,
                              id: movie.id
                          })),
                          { type: 'Favorite', id: 'LIST' }
                      ]
                    : [{ type: 'Favorite', id: 'LIST' }]
        }),
        addFavorite: builder.mutation<AddFavoriteResType, AddFavoriteBodyType>({
            query: (body) => ({
                url: '/customers/favorites',
                method: HttpMethod.POST,
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Favorite', id: 'LIST' },
                { type: 'Movie', id: arg.movieId }
            ]
        }),
        removeFavorite: builder.mutation<RemoveFavoriteResType, { params: RemoveFavoriteParamsType }>({
            query: ({ params }) => ({
                url: `/customers/favorites/${params.movieId}`,
                method: HttpMethod.DELETE
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Favorite', id: 'LIST' },
                { type: 'Favorite', id: arg.params.movieId },
                { type: 'Movie', id: arg.params.movieId }
            ]
        })
    })
})

export const { useGetCustomerFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } = favoriteApi
