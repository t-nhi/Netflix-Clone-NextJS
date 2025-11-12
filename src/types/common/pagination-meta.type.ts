import z from 'zod'

export const PaginationMetaSchema = z.object({
    limit: z.number(),
    current_page: z.number(),
    total_page: z.number()
})

export type PaginationMetaType = z.infer<typeof PaginationMetaSchema>
