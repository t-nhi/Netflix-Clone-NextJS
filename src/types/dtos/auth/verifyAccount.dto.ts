import { HttpResponseSchema } from '@/types/common/http-response'
import z from 'zod'

export const VerifyAccountBodySchema = z
    .object({
        account_verification_token: z.string().min(1, 'account verification token is required')
    })
    .strict()
export type VerifyAccountBodyType = z.infer<typeof VerifyAccountBodySchema>

export const VerifyAccountResSchema = HttpResponseSchema
export type VerifyAccountResType = z.infer<typeof VerifyAccountResSchema>
