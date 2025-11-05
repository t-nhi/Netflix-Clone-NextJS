import { Role } from '@/constants/role.enum'

export interface JwtPayload {
    sub: string
    user_id: string
    username: string
    role: Role
    iat: number
    exp: number
}
