import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { SubscriptionPlanSchema } from '@/types/models/subscription.model'

export const GetAllPlansDataSchema = SubscriptionPlanSchema.array()

export const GetAllPlansResSchema = HttpResponseWithDataSchema(GetAllPlansDataSchema)

export type GetAllPlansResType = z.infer<typeof GetAllPlansResSchema>
