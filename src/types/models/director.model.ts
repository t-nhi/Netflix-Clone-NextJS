import z from 'zod'

export const DirectorSchema = z.object({
    id: z.string(),
    fullname: z.string(),
    biography: z.string(),
    avatar: z.string().nullable(),
    dateOfBirth: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type DirectorType = z.infer<typeof DirectorSchema>
