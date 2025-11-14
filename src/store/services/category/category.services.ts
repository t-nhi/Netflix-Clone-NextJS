import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from '../client'
import { CreateCategoryBodyType, CreateCategoryResType } from '@/types/dtos/category/createCategory.dto'
import { HttpMethod } from '@/constants/http.enum'
import { GetCategoryListResType } from '@/types/dtos/category/getListCategory.dto'
import { DeleteCategoryParamsType, DeleteCategoryResType } from '@/types/dtos/category/deleteCategory.dto'
import {
    UpdateCategoryBodyType,
    UpdateCategoryParamsType,
    UpdateCategoryResType
} from '@/types/dtos/category/updateCategory.dto'
import { GetCategoryByIdParamsType, GetCategoryByIdResType } from '@/types/dtos/category/getCategoryById.dto'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Category'],
    refetchOnMountOrArgChange: false,
    keepUnusedDataFor: 60,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getCategoryById: builder.query<GetCategoryByIdResType, { params: GetCategoryByIdParamsType }>({
            query: ({ params }) => ({
                url: `/categories/${params.id}`,
                method: HttpMethod.GET
            }),
            providesTags: (result, error, arg) => [{ type: 'Category', id: arg.params.id }]
        }),
        createCategory: builder.mutation<CreateCategoryResType, CreateCategoryBodyType>({
            query: (body) => ({
                url: '/categories',
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }]
        }),
        getCategories: builder.query<GetCategoryListResType, void>({
            query: () => ({
                url: '/categories',
                method: HttpMethod.GET
            }),
            providesTags: (result, error, arg) => {
                const tags = result
                    ? result.data.map((category) => ({
                          type: 'Category' as const,
                          id: category.id
                      }))
                    : []
                tags.push({ type: 'Category', id: 'LIST' })
                return tags
            }
        }),
        deleteCategory: builder.mutation<DeleteCategoryResType, { params: DeleteCategoryParamsType }>({
            query: ({ params }) => ({
                url: `/categories/${params.id}`,
                method: HttpMethod.DELETE
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.params.id },
                { type: 'Category', id: 'LIST' }
            ]
        }),
        updateCategory: builder.mutation<
            UpdateCategoryResType,
            { params: UpdateCategoryParamsType; body: UpdateCategoryBodyType }
        >({
            query: ({ params, body }) => ({
                url: `/categories/${params.id}`,
                method: HttpMethod.PUT,
                body
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Category', id: arg.params.id }]
        })
    })
})

export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryByIdQuery
} = categoryApi
