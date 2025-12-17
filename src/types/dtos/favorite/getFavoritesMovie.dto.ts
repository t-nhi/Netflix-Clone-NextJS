import z from 'zod'
import { MovieSummarySchema } from '@/types/dtos/movie/movie.dto' // Import schema bạn đã define trước đó
import { HttpResponseWithMetaSchema } from '@/types/common/http-response.type'
import { PaginationMetaSchema } from '@/types/common/pagination-meta.type'

export const GetFavoriteListQueryParamsSchema = z.object({
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().optional()
})

export type GetFavoriteListQueryParamsType = z.infer<typeof GetFavoriteListQueryParamsSchema>

export const GetFavoriteListDataSchema = MovieSummarySchema.array()

export const GetFavoriteListResSchema = HttpResponseWithMetaSchema({
    dataSchema: GetFavoriteListDataSchema,
    metaSchema: PaginationMetaSchema
})

export type GetFavoriteListResType = z.infer<typeof GetFavoriteListResSchema>
