import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import { UserSchema } from '@/types/models/user.model'
import z from 'zod'

export const GetUserProfileDataSchema = UserSchema
export const GetUserProfileResSchema = HttpResponseWithDataSchema(GetUserProfileDataSchema)

export type GetUserProfileResType = z.infer<typeof GetUserProfileResSchema>
