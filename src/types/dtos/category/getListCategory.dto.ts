import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import { CategorySchema } from '@/types/models/category.model'
import z from 'zod'

export const GetCategoryListDataSchema = CategorySchema.array()
export const GetCategoryListResSchema = HttpResponseWithDataSchema(GetCategoryListDataSchema)
export type GetCategoryListResType = z.infer<typeof GetCategoryListResSchema>
