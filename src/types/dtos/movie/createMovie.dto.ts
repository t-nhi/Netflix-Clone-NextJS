import z from 'zod'
import { MovieSchema } from '@/types/models/movie_temp.model'
import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'

export const CreateMovieBodySchema = MovieSchema.pick({
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

export type CreateMovieBodyType = z.infer<typeof CreateMovieBodySchema>

export const CreateMovieDataSchema = MovieSchema
export const CreateMovieResSchema = HttpResponseWithDataSchema(CreateMovieDataSchema)
export type CreateMovieResType = z.infer<typeof CreateMovieResSchema>
