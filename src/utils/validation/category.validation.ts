import { z } from 'zod'

export const ActorBody = z
    .object({
        fullName: z
            .string()
            .min(1, { message: 'fullNameRequired' })
            .min(2, { message: 'fullNameTooShort' })
            .max(100, { message: 'fullNameTooLong' }),

        biography: z.string().max(500, { message: 'biographyTooLong' }).optional(),

        dateOfBirth: z
            .string()
            .optional()
            .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), { message: 'invalidDateFormat' })
    })
    .strict()

export type ActorBodyType = z.infer<typeof ActorBody>

export const GenreBody = z
    .object({
        name: z
            .string()
            .min(1, { message: 'genreNameRequired' })
            .min(2, { message: 'genreNameTooShort' })
            .max(50, { message: 'genreNameTooLong' }),
        description: z.string().max(300, { message: 'genreDescriptionTooLong' }).optional()
    })
    .strict()

export type GenreBodyType = z.infer<typeof GenreBody>
