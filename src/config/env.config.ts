import { z } from 'zod'

export const EnvConfigSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string().min(1, 'NEXT_PUBLIC_API_ENDPOINT is required'),
    NEXT_PUBLIC_URL: z.string().min(1, 'NEXT_PUBLIC_URL is required')
})

export type EnvConfigType = z.infer<typeof EnvConfigSchema>

const envConfigParsed = EnvConfigSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
})

if (!envConfigParsed.success) {
    if (envConfigParsed.error.issues) {
        console.error('Invalid environment variables:', envConfigParsed.error.issues)
        throw new Error(`Environment variable validation error: ${envConfigParsed.error.issues}`)
    }
}
export const envConfig: EnvConfigType = envConfigParsed.data as EnvConfigType
