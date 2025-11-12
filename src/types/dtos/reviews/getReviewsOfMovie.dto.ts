import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import { ReviewSchema } from '@/types/models/review.model'
import z from 'zod'

export const GetReviewsOfMovieDataSchema = ReviewSchema.array()
export const GetReviewsOfMovieResSchema = HttpResponseWithDataSchema(GetReviewsOfMovieDataSchema)
export type GetReviewsOfMovieResType = z.infer<typeof GetReviewsOfMovieResSchema>
