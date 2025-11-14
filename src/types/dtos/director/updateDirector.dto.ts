import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { DirectorSchema } from '@/types/models/director.model'

export const UpdateDirectorBodySchema = DirectorSchema.pick({
    fullname: true,
    biography: true,
    avatar: true,
    dateOfBirth: true
})
export type UpdateDirectorBodyType = z.infer<typeof UpdateDirectorBodySchema>

export const UpdateDirectorParamsSchema = z.object({
    id: z.string()
})
export type UpdateDirectorParamsType = z.infer<typeof UpdateDirectorParamsSchema>

export const UpdateDirectorDataSchema = DirectorSchema
export const UpdateDirectorResSchema = HttpResponseWithDataSchema(UpdateDirectorDataSchema)
export type UpdateDirectorResType = z.infer<typeof UpdateDirectorResSchema>
