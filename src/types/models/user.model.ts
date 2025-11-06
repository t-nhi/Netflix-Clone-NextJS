import z from 'zod'
import { RoleSchema } from './role.model'

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    is_enabled: z.boolean(),
    account_verified_at: z.string().nullable(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
    role: RoleSchema
})

export type UserType = z.infer<typeof UserSchema>

export const AuthUserSchema = UserSchema.pick({
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    is_enabled: true,
    role: true,
    created_at: true,
    updated_at: true,
    account_verified_at: true
})

export type AuthUserType = z.infer<typeof AuthUserSchema>
