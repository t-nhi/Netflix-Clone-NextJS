import z from 'zod'

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    is_enabled: z.boolean()
})

export type UserType = z.infer<typeof UserSchema>
