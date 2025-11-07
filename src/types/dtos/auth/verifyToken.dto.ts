import { HttpResponseWithDataSchema } from '@/types/common/http-response'
import z from 'zod'

export const verifyTokenBodySchema = z
    .object({
        token: z.string().min(1)
    })
    .strict()

export type VerifyTokenBodyType = z.infer<typeof verifyTokenBodySchema>

export const verifyTokenResDataSchema = z.object({
    email: z.string().email()
})
export const verifyTokenResSchema = HttpResponseWithDataSchema(verifyTokenResDataSchema)
export type VerifyTokenResType = z.infer<typeof verifyTokenResSchema>
