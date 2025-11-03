import { HttpStatusMessage as HTTPStatusEnum } from '@/constants/http.enum'
import { z } from 'zod'

export const HttpStatusMessageSchema = z.enum(HTTPStatusEnum)

export const HttpResponseSchema = z
    .object({
        status: HttpStatusMessageSchema,
        message: z.string(),
        path: z.string(),
        method: z.string()
    })
    .strict()

export const HttpResponseWithDataSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    HttpResponseSchema.extend({
        data: dataSchema
    }).strict()

export const HttpResponseWithMetaSchema = <T extends z.ZodTypeAny, M extends z.ZodTypeAny>(
    dataSchema: T,
    metaSchema: M
) =>
    HttpResponseSchema.extend({
        data: dataSchema,
        meta: metaSchema
    })

export const HttpResponseWithErrorSchema = HttpResponseSchema.extend({
    title: z.string(),
    detail: z.string()
})

export const EntityErrorSchema = z.object({
    field: z.string(),
    code: z.string(),
    message: z.string()
})

export const HttpResponseWithEntityErrorsSchema = HttpResponseWithErrorSchema.extend({
    errors: z.array(EntityErrorSchema)
})

export type HttpStatusMessage = z.infer<typeof HttpStatusMessageSchema>
export type HttpResponse = z.infer<typeof HttpResponseSchema>
export type HttpResponseWithError = z.infer<typeof HttpResponseWithErrorSchema>
export type EntityError = z.infer<typeof EntityErrorSchema>
export type HttpResponseWithEntityErrors = z.infer<typeof HttpResponseWithEntityErrorsSchema>
