import { UserSchema } from '@/types/models/user.model'
import z from 'zod'

export const ManagerAccountSchema = UserSchema.pick({
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    is_enabled: true,
    role: true,
    account_verified_at: true,
    created_at: true,
    updated_at: true
})

export type ManagerAccountType = z.infer<typeof ManagerAccountSchema>
