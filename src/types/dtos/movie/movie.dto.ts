import { MovieSchema } from '@/types/models/movie.model'
import z from 'zod'

export const MovieSummarySchema = MovieSchema.pick({
    id: true,
    description: true,
    title: true,
    horizontalPoster: true,
    verticalPoster: true,
    releaseDate: true,
    age: true,
    year: true,
    country: true,
    isVip: true,
    trailerUrl: true,
    categories: true,
    actors: true,
    directors: true
})

export type MovieSummaryType = z.infer<typeof MovieSummarySchema>
