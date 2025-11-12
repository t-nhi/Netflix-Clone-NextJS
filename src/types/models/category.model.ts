import z from 'zod'

export const CategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string()
})
export type CategoryType = z.infer<typeof CategorySchema>
