import { HttpResponseSchema } from '@/types/common/http-response.type'
import z from 'zod'

export const LogoutBodySchema = z
    .object({
        refresh_token: z.string().min(1, 'refresh token is required')
    })
    .strict()
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>

export const LogoutResSchema = HttpResponseSchema
export type LogoutResType = z.infer<typeof LogoutResSchema>
