import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import { UserSchema } from '@/types/models/user.model'
import z from 'zod'

export const UpdateProfileBodySchema = UserSchema.pick({
    first_name: true,
    last_name: true,
    avatar_url: true,
    gender: true,
    date_of_birth: true
})

export type UpdateProfileBodyType = z.infer<typeof UpdateProfileBodySchema>

export const UpdateProfileDataSchema = UserSchema
export const UpdateProfileResSchema = HttpResponseWithDataSchema(UpdateProfileDataSchema)
export type UpdateProfileResType = z.infer<typeof UpdateProfileResSchema>
