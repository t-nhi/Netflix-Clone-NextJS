import z from 'zod'
import { HttpResponseWithDataSchema } from '@/types/common/http-response'

export const RefreshTokenBodySchema = z
    .object({
        refresh_token: z.string().min(1, 'refresh token is required')
    })
    .strict()
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>

const RefreshTokenDataSchema = z
    .object({
        access_token: z.string()
    })
    .strict()
export const RefreshTokenResSchema = HttpResponseWithDataSchema(RefreshTokenDataSchema)
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>
