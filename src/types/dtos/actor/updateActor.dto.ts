import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { ActorSchema } from '@/types/models/actor.model'
import z from 'zod'

export const UpdateActorBodySchema = ActorSchema.pick({
    fullname: true,
    biography: true,
    avatar: true,
    dateOfBirth: true
})

export type UpdateActorBodyType = z.infer<typeof UpdateActorBodySchema>

export const UpdateActorParamsSchema = z.object({
    id: z.string()
})
export type UpdateActorParamsType = z.infer<typeof UpdateActorParamsSchema>

export const UpdateActorDataSchema = ActorSchema
export const UpdateActorResSchema = HttpResponseWithDataSchema(UpdateActorDataSchema)
export type UpdateActorResType = z.infer<typeof UpdateActorResSchema>
