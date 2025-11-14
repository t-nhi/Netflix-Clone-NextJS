import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'

export type UploadImageBodyType = FormData

export const UploadImageDataSchema = z.object({
    url: z.string()
})
export const UploadImageResSchema = HttpResponseWithDataSchema(UploadImageDataSchema)
export type UploadImageResType = z.infer<typeof UploadImageResSchema>
