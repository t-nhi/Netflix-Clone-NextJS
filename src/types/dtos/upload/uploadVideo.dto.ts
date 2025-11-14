import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import z from 'zod'

export type UploadVideoBodyType = FormData

export const UploadVideoDataSchema = z.object({
    url: z.string()
})
export const UploadVideoResSchema = HttpResponseWithDataSchema(UploadVideoDataSchema)
export type UploadVideoResType = z.infer<typeof UploadVideoResSchema>
