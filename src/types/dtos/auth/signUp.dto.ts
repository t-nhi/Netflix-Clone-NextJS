import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import { UserSchema } from '@/types/models/user.model'
import z from 'zod'

export const SignUpBodySchema = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)+$/, { message: 'passwordInvalid' }),
        token: z.string().min(1)
    })
    .strict()
export type SignUpBodyType = z.infer<typeof SignUpBodySchema>

export const SignUpDataSchema = z
    .object({
        access_token: z.string(),
        refresh_token: z.string(),
        user: UserSchema.pick({ id: true, email: true, first_name: true, last_name: true, is_enabled: true })
    })
    .strict()
export const SignUpResSchema = HttpResponseWithDataSchema(SignUpDataSchema)
export type SignUpResType = z.infer<typeof SignUpResSchema>
