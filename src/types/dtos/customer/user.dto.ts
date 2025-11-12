import { UserSchema } from '@/types/models/user.model'
import z from 'zod'

export const UserSummarySchema = UserSchema.pick({
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

export type UserSummaryType = z.infer<typeof UserSummarySchema>
