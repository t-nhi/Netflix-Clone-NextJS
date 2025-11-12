import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { MovieSchema } from '@/types/models/movie.model'
import z from 'zod'

export const GetMovieByIdParamsSchema = z.object({
    movieId: z.string()
})
export type GetMovieByIdParamsType = z.infer<typeof GetMovieByIdParamsSchema>

export const GetMovieByIdDataSchema = MovieSchema
export const GetMovieByIdResSchema = HttpResponseWithDataSchema(GetMovieByIdDataSchema)
export type GetMovieByIdResType = z.infer<typeof GetMovieByIdResSchema>
