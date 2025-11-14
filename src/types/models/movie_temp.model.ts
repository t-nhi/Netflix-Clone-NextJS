import { MovieStatus } from '@/constants/upload-file/movie-upload-status.enum'
import { VideoQuality } from '@/constants/video/video-quality.enum'
import z from 'zod'

export const QuantitiesSchema = z.array(z.enum(VideoQuality))
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
