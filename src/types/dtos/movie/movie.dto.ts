import { MovieSchema } from '@/types/models/movie.model'
import z from 'zod'

export const MovieSummarySchema = MovieSchema.pick({
    id: true,
    description: true,
    title: true,
    horizontalPoster: true,
    releaseDate: true
})

export type MovieSummaryType = z.infer<typeof MovieSummarySchema>
