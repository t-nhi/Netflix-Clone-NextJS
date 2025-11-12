import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import z from 'zod'

export const GetReviewCountDataSchema = z.number().min(0)
export const GetReviewCountResSchema = HttpResponseWithDataSchema(GetReviewCountDataSchema)
export type GetReviewCountResType = z.infer<typeof GetReviewCountResSchema>
