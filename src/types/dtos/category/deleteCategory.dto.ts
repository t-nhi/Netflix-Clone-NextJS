import { HttpResponseSchema } from '@/types/common/http-response'
import z from 'zod'

export const DeleteCategoryParamsSchema = z.object({
    id: z.string()
})

export type DeleteCategoryParamsType = z.infer<typeof DeleteCategoryParamsSchema>

export const DeleteCategoryResSchema = HttpResponseSchema
export type DeleteCategoryResType = z.infer<typeof DeleteCategoryResSchema>
