import z from 'zod'

export const CategorySchema = z.object({
    id: z.string(),
    name: z.string().nonempty('genreNameRequired').min(3, 'genreNameTooShort').max(50, 'genreNameTooLong'),
    description: z.string().min(0).max(300, 'genreDescriptionTooLong')
})

export type CategoryType = z.infer<typeof CategorySchema>
