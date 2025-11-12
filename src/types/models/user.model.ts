import z from 'zod'
import { RoleSchema } from './role.model'
import { Gender } from '@/constants/gender.enum'

export const UserSchema = z.object({
    id: z.string(),
    email: z.email(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    is_enabled: z.boolean(),
    account_verified_at: z.string().nullable(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
    role: RoleSchema,
    display_lang: z.string().default('en'),
    is_anonymous: z.boolean().default(false),
    avatar_url: z.string().nullable(),
    account_id: z.string().nullable(),
    gender: z.enum(Gender)
})

export type UserType = z.infer<typeof UserSchema>
