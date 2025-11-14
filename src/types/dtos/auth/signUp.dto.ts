import { HttpResponseWithDataSchema } from '@/types/common/http-response.type'
import z from 'zod'
import { UserSummarySchema } from '../customer/user.dto'

export const SignUpBodySchema = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, { message: 'passwordInvalid' }),
        token: z.string().min(1)
    })
    .strict()
export type SignUpBodyType = z.infer<typeof SignUpBodySchema>

export const SignUpDataSchema = z
    .object({
        access_token: z.string(),
        refresh_token: z.string(),
        user: UserSummarySchema
    })
    .strict()
export const SignUpResSchema = HttpResponseWithDataSchema(SignUpDataSchema)
export type SignUpResType = z.infer<typeof SignUpResSchema>
