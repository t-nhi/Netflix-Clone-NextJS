import { HttpResponseSchema } from '@/types/common/http-response.type'
import z from 'zod'

export const ResetPasswordBodySchema = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        otp: z.string().min(1),
        new_password: z
            .string()
            .min(1, { message: 'passwordRequired' })
            .min(8, { message: 'passwordMinLength' })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, { message: 'passwordInvalid' })
    })
    .strict()
export type ResetPasswordBodyType = z.infer<typeof ResetPasswordBodySchema>

export const ResetPasswordResSchema = HttpResponseSchema
export type ResetPasswordResType = z.infer<typeof ResetPasswordResSchema>
