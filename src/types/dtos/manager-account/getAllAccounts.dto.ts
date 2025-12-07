import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { ManagerAccountSchema } from '@/types/dtos/manager-account/manager-account.dto'

export const GetAllAccountDataSchema = ManagerAccountSchema.array()

export const GetAllAccountResSchema = HttpResponseWithDataSchema(GetAllAccountDataSchema)

export type GetAllAccountResType = z.infer<typeof GetAllAccountResSchema>
