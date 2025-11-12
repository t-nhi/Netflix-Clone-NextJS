import { HttpResponseSchema } from '@/types/common/http-response.type'
import z from 'zod'

export const ForgotPasswordBodySchema = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' })
    })
    .strict()
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordBodySchema>

export const ForgotPasswordResSchema = HttpResponseSchema
export type ForgotPasswordResType = z.infer<typeof ForgotPasswordResSchema>
