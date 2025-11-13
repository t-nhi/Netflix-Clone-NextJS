import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import z from 'zod'
import { MovieSummarySchema } from './movie.dto'

export const GetAllMovieSDataSchema = MovieSummarySchema.array()

export const GetAllMovieResSchema = HttpResponseWithDataSchema(GetAllMovieSDataSchema)
export type GetAllMovieResType = z.infer<typeof GetAllMovieResSchema>
