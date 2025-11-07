import { Quality, AgeRank } from '@/app/constants/enums'
import { z } from 'zod'

export const CreateFilmReqBody = z
    .object({
        title: z.string().min(1, { message: 'titleRequired' }),

        description: z
            .string()
            .min(1, { message: 'descriptionRequired' })
            .max(5000, { message: 'descriptionMaxLength' }),

        release_date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'releaseDateInvalid' }),

        directors: z.array(z.string().min(1)).min(1, { message: 'directorsRequired' }),

        actors: z.array(z.string().min(1)).min(1, { message: 'actorsRequired' }),

        genres: z.array(z.string().min(1)).min(1, { message: 'genresRequired' }),

        country: z.string().min(1, { message: 'countryRequired' }),

        trailer_url: z.string().optional(),
        vertical_poster: z
            .instanceof(File, { message: 'verticalPosterRequired' })
            .or(z.string().min(1, { message: 'verticalPosterRequired' })),

        horizontal_poster: z
            .instanceof(File, { message: 'horizontalPosterRequired' })
            .or(z.string().min(1, { message: 'horizontalPosterRequired' })),

        age: z.union([z.literal(AgeRank.P), z.literal(AgeRank.T13), z.literal(AgeRank.T16), z.literal(AgeRank.T18)], {
            message: 'ageRequired'
        }),

        quality: z.union(
            [
                z.literal(Quality.SD),
                z.literal(Quality.HD),
                z.literal(Quality.FULL_HD),
                z.literal(Quality.QHD),
                z.literal(Quality.UHD)
            ],
            { message: 'qualityRequired' }
        ),

        duration_minutes: z.number({ message: 'durationInvalid' }).min(1, { message: 'durationMin' }),

        film_url: z.string().optional(),
        isVip: z.boolean().optional()
    })
    .strict()

export type CreateFilmReqBodyType = z.infer<typeof CreateFilmReqBody>
