import z from 'zod'

export const RemoveFavoriteParamsSchema = z.object({
    movieId: z.string()
})

export type RemoveFavoriteParamsType = z.infer<typeof RemoveFavoriteParamsSchema>

export const RemoveFavoriteResSchema = z.object({
    message: z.string().optional(),
    success: z.boolean().optional()
})

export type RemoveFavoriteResType = z.infer<typeof RemoveFavoriteResSchema>
