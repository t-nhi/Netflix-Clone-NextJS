import z from 'zod'

export const RoleSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable()
})

export type RoleType = z.infer<typeof RoleSchema>
