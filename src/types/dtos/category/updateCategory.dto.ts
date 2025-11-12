import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { CategorySchema } from '@/types/models/category.model'
import z from 'zod'

export const UpdateCategoryBodySchema = CategorySchema.pick({
    name: true,
    description: true
})
export type UpdateCategoryBodyType = z.infer<typeof UpdateCategoryBodySchema>

export const UpdateCategoryParamsSchema = z.object({
    id: z.string()
})
export type UpdateCategoryParamsType = z.infer<typeof UpdateCategoryParamsSchema>

export const UpdateCategoryDataSchema = CategorySchema
export const UpdateCategoryResSchema = HttpResponseWithDataSchema(UpdateCategoryDataSchema)
export type UpdateCategoryResType = z.infer<typeof UpdateCategoryResSchema>
