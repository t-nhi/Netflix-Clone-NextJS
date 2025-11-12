import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './client'
import { CreateCategoryBodyType, CreateCategoryResType } from '@/types/dtos/category/createCategory.dto'
import { HttpMethod } from '@/constants/http.enum'
import { GetCategoryListResType } from '@/types/dtos/category/getListCategory.dto'
import { DeleteCategoryParamsType, DeleteCategoryResType } from '@/types/dtos/category/deleteCategory.dto'
import {
    UpdateCategoryBodyType,
    UpdateCategoryParamsType,
    UpdateCategoryResType
} from '@/types/dtos/category/updateCategory.dto'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        createCategory: builder.mutation<CreateCategoryResType, CreateCategoryBodyType>({
            query: (body) => ({
                url: '/categories',
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: ['Category']
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
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.params.id },
                { type: 'Category', id: 'LIST' }
            ]
        })
    })
})
