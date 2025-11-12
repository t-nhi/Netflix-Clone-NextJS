import z from 'zod'

export const ReviewSchema = z.object({
    id: z.string(),
    movieId: z.string(),
    customerId: z.string(),
    content: z.string(),
    stars: z.number().min(1).max(5),
    userName: z.string(),
    userAvatar: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type ReviewType = z.infer<typeof ReviewSchema>
