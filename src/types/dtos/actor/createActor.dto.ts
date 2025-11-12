import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import { ActorSchema } from '@/types/models/actor.model'
import z from 'zod'

export const CreateActorBodySchema = z.object({
    fullname: z.string(),
    biography: z.string()
})

export type CreateActorBodyType = z.infer<typeof CreateActorBodySchema>

export const CreateActorDataSchema = ActorSchema
export const CreateActorResSchema = HttpResponseWithDataSchema(CreateActorDataSchema)
export type CreateActorResType = z.infer<typeof CreateActorResSchema>
