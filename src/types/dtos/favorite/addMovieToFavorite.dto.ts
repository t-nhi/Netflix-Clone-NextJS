import z from 'zod'

export const AddFavoriteBodySchema = z.object({
    movieId: z.string()
})

export type AddFavoriteBodyType = z.infer<typeof AddFavoriteBodySchema>

export const AddFavoriteResSchema = z.object({
    message: z.string().optional(),
    success: z.boolean().optional()
})

export type AddFavoriteResType = z.infer<typeof AddFavoriteResSchema>
