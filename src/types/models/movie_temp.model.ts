import { MovieStatus } from '@/constants/upload-file/movie-upload-status.enum'
import { VideoQuality } from '@/constants/video/video-quality.enum'
import z from 'zod'

export const QuantitiesSchema = z.object({
    master: z.string(),
    [VideoQuality.FULL_HD]: z.string(),
    [VideoQuality.HD]: z.string(),
    [VideoQuality.SD]: z.string()
})
export type QuantitiesType = z.infer<typeof QuantitiesSchema>

export const MovieSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(MovieStatus),
    qualities: QuantitiesSchema,
    verticalPoster: z.string(),
    horizontalPoster: z.string(),
    releaseDate: z.string(),
    trailerUrl: z.string(),
    age: z.number(),
    year: z.number(),
    country: z.string()
})
export type MovieType = z.infer<typeof MovieSchema>

export const UpdateMovieSchema = MovieSchema.omit({
    id: true,
    status: true,
    qualities: true,
    year: true
}).extend({
    directors: z.array(z.string()).optional(),
    actors: z.array(z.string()).optional(),
    genres: z.array(z.string()).optional(),
    duration_minutes: z.number().min(1).optional(),
    isVip: z.boolean().optional()
})

export type UpdateMovieType = z.infer<typeof UpdateMovieSchema>
