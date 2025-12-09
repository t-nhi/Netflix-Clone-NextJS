import { PaginationQuerySchema } from '@/types/common/pagination-query.type'
import z from 'zod'
import { MovieSummarySchema } from './movie.dto'
import { HttpResponseWithMetaSchema } from '@/types/common/http-response.type'
import { PaginationMetaSchema } from '@/types/common/pagination-meta.type'

export const SearchMovieQuerySchema = PaginationQuerySchema.extend({
    keyword: z.string().min(1),
    userRole: z.string().optional().default('USER')
})
export type SearchMovieQueryType = z.infer<typeof SearchMovieQuerySchema>

export const SearchMovieDataSchema = MovieSummarySchema.array()
export const SearchMovieResSchema = HttpResponseWithMetaSchema({
    dataSchema: SearchMovieDataSchema,
    metaSchema: PaginationMetaSchema
})
export type SearchMovieResType = z.infer<typeof SearchMovieResSchema>
