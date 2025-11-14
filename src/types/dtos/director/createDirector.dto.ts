import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { DirectorSchema } from '@/types/models/director.model'
import z from 'zod'

export const CreateDirectorBodySchema = DirectorSchema.pick({
    fullname: true,
    biography: true,
    avatar: true,
    dateOfBirth: true
})

export type CreateDirectorBodyType = z.infer<typeof CreateDirectorBodySchema>

export const CreateDirectorDataSchema = DirectorSchema
export const CreateDirectorResSchema = HttpResponseWithDataSchema(CreateDirectorDataSchema)
export type CreateDirectorResType = z.infer<typeof CreateDirectorResSchema>
