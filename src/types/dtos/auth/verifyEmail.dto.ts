import { HttpResponseSchema } from '@/types/common/http-response'
import z from 'zod'

export const VerifyEmailBodySchema = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' })
    })
    .strict()
export type VerifyEmailBodyType = z.infer<typeof VerifyEmailBodySchema>

export const VerifyEmailResSchema = HttpResponseSchema
export type VerifyEmailResType = z.infer<typeof VerifyEmailResSchema>
