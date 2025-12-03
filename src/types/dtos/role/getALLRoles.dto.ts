import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { RoleSchema } from '@/types/models/role.model'

export const GetAllRolesDataSchema = RoleSchema.array()

export const GetAllRolesResSchema = HttpResponseWithDataSchema(GetAllRolesDataSchema)

export type GetAllRolesResType = z.infer<typeof GetAllRolesResSchema>
