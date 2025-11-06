import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import { AuthUserSchema } from '@/types/models/user.model'

export const LoginBodySchema = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z.string().min(1, { message: 'passwordRequired' })
    })
    .strict()

export type LoginBodyType = z.infer<typeof LoginBodySchema>

export const LoginResDataSchema = z
    .object({
        access_token: z.string(),
        refresh_token: z.string(),
        user: AuthUserSchema
    })
    .strict()
export const LoginResSchema = HttpResponseWithDataSchema(LoginResDataSchema)
export type LoginResType = z.infer<typeof LoginResSchema>
