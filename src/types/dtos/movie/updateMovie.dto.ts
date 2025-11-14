import z from 'zod'
import { MovieSchema } from '@/types/models/movie_temp.model'
import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'

export const updateMovieBodySchema = MovieSchema.pick({
    title: true,
    description: true,
    trailerUrl: true,
    horizontalPoster: true,
    verticalPoster: true,
    releaseDate: true,
    age: true,
    year: true,
    country: true,
    isVip: true
}).extend({
    categoryIds: z.array(z.string()),
    actorIds: z.array(z.string()),
    directorIds: z.array(z.string())
})

export type UpdateMovieBodyType = z.infer<typeof updateMovieBodySchema>

export const UpdateMovieParamsSchema = z.object({
    movieId: z.string()
})
export type UpdateMovieParamsType = z.infer<typeof UpdateMovieParamsSchema>

export const UpdateMovieDataSchema = MovieSchema
export const UpdateMovieResSchema = HttpResponseWithDataSchema(UpdateMovieDataSchema)
export type UpdateMovieResType = z.infer<typeof UpdateMovieResSchema>
