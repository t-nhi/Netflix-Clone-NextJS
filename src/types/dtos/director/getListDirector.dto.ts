import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { DirectorSchema } from '@/types/models/director.model'

export const GetAllDirectorDataSchema = DirectorSchema.array()

export const GetAllDirectorResSchema = HttpResponseWithDataSchema(GetAllDirectorDataSchema)
export type GetAllDirectorResType = z.infer<typeof GetAllDirectorResSchema>
