import { HttpResponseSchema } from '@/types/common/http-response.type'
import z from 'zod'

export const DeleteMovieParamsSchema = z.object({
    movieId: z.string()
})
export type DeleteMovieParamsType = z.infer<typeof DeleteMovieParamsSchema>

export const DeleteMovieResSchema = HttpResponseSchema
export type DeleteMovieResType = z.infer<typeof DeleteMovieResSchema>
