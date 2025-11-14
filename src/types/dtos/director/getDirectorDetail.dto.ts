import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { DirectorSchema } from '@/types/models/director.model'
import z from 'zod'

export const GetDirectorDetailParamsSchema = z.object({
    id: z.string()
})
export type GetDirectorDetailParamsType = z.infer<typeof GetDirectorDetailParamsSchema>

export const GetDirectorDetailDataSchema = DirectorSchema
export const GetDirectorDetailResSchema = HttpResponseWithDataSchema(GetDirectorDetailDataSchema)
export type GetDirectorDetailResType = z.infer<typeof GetDirectorDetailResSchema>
