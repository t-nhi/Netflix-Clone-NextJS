import { HttpResponseSchema } from '@/types/common/http-response.type'
import z from 'zod'

export const DeleteActorParamSchema = z.object({
    id: z.string()
})
export type DeleteActorParamType = z.infer<typeof DeleteActorParamSchema>
export const DeleteActorResSchema = HttpResponseSchema
export type DeleteActorResType = z.infer<typeof DeleteActorResSchema>
