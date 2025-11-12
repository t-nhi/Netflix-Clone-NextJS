import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import z from 'zod'
import { MovieSummarySchema } from './movie.dto'

export const GetMovieListSDataSchema = MovieSummarySchema.array()

export const GetListMovieResSchema = HttpResponseWithDataSchema(GetMovieListSDataSchema)
export type GetListMovieResType = z.infer<typeof GetListMovieResSchema>
