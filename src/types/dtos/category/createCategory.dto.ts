import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import { CategorySchema } from '@/types/models/category.model'
import z from 'zod'

export const CreateCategoryBodySchema = CategorySchema.pick({
    name: true,
    description: true
})
export type CreateCategoryBodyType = z.infer<typeof CreateCategoryBodySchema>

export const CreateCategoryResSchema = HttpResponseWithDataSchema(CategorySchema)
export type CreateCategoryResType = z.infer<typeof CreateCategoryResSchema>
