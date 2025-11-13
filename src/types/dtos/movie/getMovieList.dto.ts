import z from 'zod'
import { MovieSummarySchema } from './movie.dto'
import { HttpResponseWithMetaSchema } from '@/types/common/http-response.type'
import { PaginationMetaSchema } from '@/types/common/pagination-meta.type'

export const GetMovieListQueryParamsSchema = z.object({
    page: z.string().optional(),
    size: z.string().optional(),
    sortBy: z.string().optional(),
    sortDirection: z.enum(['asc', 'desc']).default('asc').optional()
})
export type GetMovieListQueryParamsType = z.infer<typeof GetMovieListQueryParamsSchema>

export const GetMovieListDataSchema = MovieSummarySchema.array()
export const GetMovieListResSchema = HttpResponseWithMetaSchema({
    dataSchema: GetMovieListDataSchema,
    metaSchema: PaginationMetaSchema
})
export type GetMovieListResType = z.infer<typeof GetMovieListResSchema>
