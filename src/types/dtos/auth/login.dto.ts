import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import { UserSchema } from '@/types/models/user.model'

export const LoginBodySchema = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)+$/, { message: 'passwordInvalid' })
    })
    .strict()

export type LoginBodyType = z.infer<typeof LoginBodySchema>

export const LoginResDataSchema = z
    .object({
        access_token: z.string(),
        refresh_token: z.string(),
        user: UserSchema.pick({ id: true, email: true, first_name: true, last_name: true, is_enabled: true })
    })
    .strict()
export const LoginResSchema = HttpResponseWithDataSchema(LoginResDataSchema)
export type LoginResType = z.infer<typeof LoginResSchema>
