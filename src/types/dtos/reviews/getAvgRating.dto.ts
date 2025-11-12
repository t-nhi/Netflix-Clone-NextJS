import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import z from 'zod'
export const GetAvgRatingParamsSchema = z.object({
    movieId: z.string()
})
export type GetAvgRatingParamsType = z.infer<typeof GetAvgRatingParamsSchema>

export const GetAvgRatingDataSchema = z.number().min(0).max(5)
export const GetAvgRatingResSchema = HttpResponseWithDataSchema(GetAvgRatingDataSchema)
export type GetAvgRatingResType = z.infer<typeof GetAvgRatingResSchema>
