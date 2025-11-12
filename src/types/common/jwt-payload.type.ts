import { Role } from '@/constants/role.enum'
import z from 'zod'

export const JwtPayloadTypeSchema = z.object({
    sub: z.string(),
    user_id: z.string(),
    username: z.string(),
    role: z.enum(Role),
    iat: z.number(),
    exp: z.number()
})
export type JwtPayloadTypeType = z.infer<typeof JwtPayloadTypeSchema>
