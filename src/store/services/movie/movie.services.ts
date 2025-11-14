import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '../client'
import { GetMovieListQueryParamsType, GetMovieListResType } from '@/types/dtos/movie/getMovieList.dto'
import { HttpMethod } from '@/constants/http.enum'
import { GetMovieByIdParamsType, GetMovieByIdResType } from '@/types/dtos/movie/getMovieById.dto'
import { GetAllMovieResType } from '@/types/dtos/movie/getAllMovie.dto'
import { CreateMovieBodyType, CreateMovieResType } from '@/types/dtos/movie/createMovie.dto'
import { UpdateMovieBodyType, UpdateMovieParamsType, UpdateMovieResType } from '@/types/dtos/movie/updateMovie.dto'
import { DeleteMovieParamsType, DeleteMovieResType } from '@/types/dtos/movie/deleteMovie.dto'
import { SearchMovieQueryType, SearchMovieResType } from '@/types/dtos/movie/searchMovie.dto'

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: baseQueryWithReauth,
    refetchOnMountOrArgChange: false,
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    tagTypes: ['Movie'],
    endpoints: (builder) => ({
        getAllMovies: builder.query<GetAllMovieResType, void>({
            query: () => ({
                url: '/movies/all',
                method: HttpMethod.GET
            }),
            providesTags: (result) => {
                const tags = result
                    ? result.data.map((movie) => ({
                          type: 'Movie' as const,
                          id: movie.id
                      }))
                    : []
                tags.push({ type: 'Movie', id: 'LIST' })
                return tags
            }
        }),
        getMovieById: builder.query<GetMovieByIdResType, { params: GetMovieByIdParamsType }>({
            query: ({ params }) => ({
                url: `/movies/${params.movieId}`,
                method: HttpMethod.GET
            }),
            providesTags: (result, error, arg) => [{ type: 'Movie' as const, id: arg.params.movieId }]
        }),
        getMovies: builder.infiniteQuery<GetMovieListResType, { query: GetMovieListQueryParamsType }, number>({
            query: ({ pageParam, queryArg: { query } }) => {
                const queryString = new URLSearchParams({
                    ...query,
                    page: pageParam ? pageParam.toString() : '1'
                }).toString()
                return {
                    url: `/movies?${queryString}`,
                    method: HttpMethod.GET
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.pages
                              .flatMap((page) => page.data)
                              .map((movie) => ({
                                  type: 'Movie' as const,
                                  id: movie.id
                              })),
                          { type: 'Movie', id: 'LIST' }
                      ]
                    : [{ type: 'Movie', id: 'LIST' }],
            infiniteQueryOptions: {
                initialPageParam: 1,
                maxPages: 5,
                getNextPageParam: ({ meta }) => {
                    if (!meta) return undefined
                    const { total_pages, current_page } = meta
                    if (current_page >= total_pages) return undefined
                    return current_page + 1
                },
                getPreviousPageParam: ({ meta }) => {
                    if (!meta) return undefined
                    const { current_page } = meta
                    if (current_page <= 1) return undefined
                    return current_page - 1
                }
            }
        }),
        searchMovies: builder.infiniteQuery<SearchMovieResType, { query: SearchMovieQueryType }, number>({
            query: ({ pageParam, queryArg: { query } }) => {
                const queryString = new URLSearchParams({
                    ...query,
                    page: pageParam ? pageParam.toString() : '1'
                }).toString()

                return {
                    url: `/movies/search?${queryString}`,
                    method: HttpMethod.GET
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.pages
                              .flatMap((page) => page.data)
                              .map((movie) => ({
                                  type: 'Movie' as const,
                                  id: movie.id
                              })),
                          { type: 'Movie', id: 'LIST' }
                      ]
                    : [{ type: 'Movie', id: 'LIST' }],
            infiniteQueryOptions: {
                initialPageParam: 1,
                maxPages: 5,
                getNextPageParam: ({ meta }) => {
                    if (!meta) return undefined
                    const { total_pages, current_page } = meta
                    if (current_page >= total_pages) return undefined
                    return current_page + 1
                },
                getPreviousPageParam: ({ meta }) => {
                    if (!meta) return undefined
                    const { current_page } = meta
                    if (current_page <= 1) return undefined
                    return current_page - 1
                }
            }
        }),
        createMovie: builder.mutation<CreateMovieResType, CreateMovieBodyType>({
            query: (body) => ({
                url: '/movies',
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: [{ type: 'Movie', id: 'LIST' }]
        }),
        updateMovie: builder.mutation<UpdateMovieResType, { params: UpdateMovieParamsType; body: UpdateMovieBodyType }>(
            {
                query: ({ params, body }) => ({
                    url: `/movies/${params.movieId}`,
                    method: HttpMethod.PUT,
                    body
                }),
                invalidatesTags: (result, error, arg) => [{ type: 'Movie', id: arg.params.movieId }]
            }
        ),
        deleteMovie: builder.mutation<DeleteMovieResType, { params: DeleteMovieParamsType }>({
            query: ({ params }) => ({
                url: `/movies/${params.movieId}`,
                method: HttpMethod.DELETE
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Movie', id: arg.params.movieId },
                { type: 'Movie', id: 'LIST' }
            ]
        })
    })
})

export const {
    useGetAllMoviesQuery,
    useGetMovieByIdQuery,
    useGetMoviesInfiniteQuery,
    useSearchMoviesInfiniteQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation
} = movieApi
