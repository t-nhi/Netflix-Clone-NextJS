import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { ReviewSchema } from '@/types/models/review.model'
import z from 'zod'

export const CreateReviewBodySchema = ReviewSchema.pick({
    content: true,
    stars: true,
    userName: true,
    userAvatar: true,
    userId: true
})
export type CreateReviewBodyType = z.infer<typeof CreateReviewBodySchema>

export const CreateReviewParamsSchema = z.object({
    movieId: z.string()
})

export const CreateReviewDataSchema = ReviewSchema
export const CreateReviewResSchema = HttpResponseWithDataSchema(CreateReviewDataSchema)
export type CreateReviewResType = z.infer<typeof CreateReviewResSchema>
