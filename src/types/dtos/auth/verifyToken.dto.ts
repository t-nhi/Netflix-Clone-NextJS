import { HttpResponseSchema } from '@/types/common/http-response'
import z from 'zod'

export const verifyTokenBodySchema = z
    .object({
        token: z.string().min(1)
    })
    .strict()

export type VerifyTokenBodyType = z.infer<typeof verifyTokenBodySchema>

export const verifyTokenResSchema = HttpResponseSchema
export type VerifyTokenResType = z.infer<typeof verifyTokenResSchema>
