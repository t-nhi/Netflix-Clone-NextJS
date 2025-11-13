import { AuthUserType } from '@/types/models/user.model'
import { Role } from '@/constants/role.enum'

export const getMockUsers = (count: number): AuthUserType[] =>
    Array.from({ length: count }).map((_, i) => ({
        id: `user-${i + 1}`,
        email: `user${i + 1}@example.com`,
        first_name: `First${i + 1}`,
        last_name: `Last${i + 1}`,
        is_enabled: Math.random() > 0.3,
        account_verified_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        role: {
            id: Role.USER,
            name: 'User',
            description: null
        }
    }))
