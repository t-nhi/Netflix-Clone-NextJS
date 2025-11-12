import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { ActorSchema } from '@/types/models/actor.model'
import z from 'zod'

export const GetActorDetailParamsSchema = z.object({
    id: z.string()
})
export type GetActorDetailParamsType = z.infer<typeof GetActorDetailParamsSchema>

export const GetActorDetailDataSchema = ActorSchema
export const GetActorDetailResSchema = HttpResponseWithDataSchema(GetActorDetailDataSchema)
export type GetActorDetailResType = z.infer<typeof GetActorDetailResSchema>
