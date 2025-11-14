import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { CategorySchema } from '@/types/models/category.model'
import z from 'zod'

export const GetCategoryByIdParamsSchema = z.object({
    id: z.string()
})

export type GetCategoryByIdParamsType = z.infer<typeof GetCategoryByIdParamsSchema>

export const GetCategoryByIdDataSchema = CategorySchema
export const GetCategoryByIdResSchema = HttpResponseWithDataSchema(GetCategoryByIdDataSchema)
export type GetCategoryByIdResType = z.infer<typeof GetCategoryByIdResSchema>
