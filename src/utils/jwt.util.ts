import jwt from 'jsonwebtoken'

export const decodeJwt = <T>(token: string): T | null => {
    try {
        const decoded = jwt.decode(token)
        if (!decoded) throw new Error('Invalid token')

        return decoded as T
    } catch (error) {
        console.error('Failed to decode JWT:', error)
        return null
    }
}
