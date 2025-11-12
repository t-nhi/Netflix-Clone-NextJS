import { HttpResponseSchema } from '@/types/common/http-response.type'
import z from 'zod'

export const UpdateCookieTokenBodySchema = z.object({
    access_token: z.string().min(1),
    refresh_token: z.string().min(1)
})
export type UpdateCookieTokenBodyType = z.infer<typeof UpdateCookieTokenBodySchema>

export const UpdateCookieTokenResSchema = HttpResponseSchema
export type UpdateCookieTokenResType = z.infer<typeof UpdateCookieTokenResSchema>
