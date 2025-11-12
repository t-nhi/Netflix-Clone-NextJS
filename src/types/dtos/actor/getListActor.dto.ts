import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { ActorSchema } from '@/types/models/actor.model'
import z from 'zod'

export const GetAllActorDataSchema = ActorSchema.array()

export const GetAllActorResSchema = HttpResponseWithDataSchema(GetAllActorDataSchema)

export type GetAllActorResType = z.infer<typeof GetAllActorResSchema>
