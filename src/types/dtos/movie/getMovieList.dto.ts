import z from 'zod'
import { MovieSummarySchema } from './movie.dto'
import { HttpResponseWithMetaSchema } from '@/types/common/http-response.type'
import { PaginationMetaSchema } from '@/types/common/pagination-meta.type'
import { PaginationQuerySchema } from '@/types/common/pagination-query.type'

export const GetMovieListQueryParamsSchema = PaginationQuerySchema
export type GetMovieListQueryParamsType = z.infer<typeof GetMovieListQueryParamsSchema>

export const GetMovieListDataSchema = MovieSummarySchema.array()
export const GetMovieListResSchema = HttpResponseWithMetaSchema({
    dataSchema: GetMovieListDataSchema,
    metaSchema: PaginationMetaSchema
})
export type GetMovieListResType = z.infer<typeof GetMovieListResSchema>
