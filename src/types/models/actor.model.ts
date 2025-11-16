import z from 'zod'

export const ActorSchema = z.object({
    id: z.string(),
    fullname: z.string().min(1, 'fullNameRequired').min(2, 'fullNameTooShort').max(100, 'fullNameTooLong'),
    biography: z.string().max(500, 'biographyTooLong'),
    avatar: z.string().nullable(),
    dateOfBirth: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type ActorType = z.infer<typeof ActorSchema>
