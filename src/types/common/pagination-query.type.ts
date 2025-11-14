import z from 'zod'

export const PaginationQuerySchema = z.object({
    page: z.string().optional(),
    size: z.string().optional(),
    sortBy: z.string().optional(),
    sortDirection: z.enum(['asc', 'desc']).default('asc').optional()
})

export type PaginationQueryType = z.infer<typeof PaginationQuerySchema>
