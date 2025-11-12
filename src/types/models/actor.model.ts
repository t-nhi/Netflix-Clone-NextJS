import z from 'zod'

export const ActorSchema = z.object({
    id: z.string(),
    fullname: z.string(),
    biography: z.string(),
    avatar: z.string().nullable(),
    dateOfBirth: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type ActorType = z.infer<typeof ActorSchema>
