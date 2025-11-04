import { HttpResponseSchema } from '@/types/common/http-response'
import z from 'zod'

export const verifyOtpBodySchema = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        otp: z.string().min(1)
    })
    .strict()
export type VerifyOtpBodyType = z.infer<typeof verifyOtpBodySchema>

export const verifyOtpResSchema = HttpResponseSchema
export type VerifyOtpResType = z.infer<typeof verifyOtpResSchema>
