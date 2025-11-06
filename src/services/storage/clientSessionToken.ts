'use client'

import { LocalStorageKeys } from '@/constants/localstorage-keys.enum'
import { AuthUserType } from '@/types/models/user.model'

const isClient = typeof window !== 'undefined'

class ClientSessionToken {
    private static instance: ClientSessionToken
    private access_token: string | null = null
    private refresh_token: string | null = null
    private user_profile: AuthUserType | null = null

    private constructor() {
        if (!isClient) return
        this.access_token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)
        this.refresh_token = localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN)
        this.user_profile = localStorage.getItem(LocalStorageKeys.USER_PROFILE)
            ? (JSON.parse(localStorage.getItem(LocalStorageKeys.USER_PROFILE) || '') as AuthUserType | null)
            : null
    }

    public static getInstance(): ClientSessionToken {
        if (!ClientSessionToken.instance) {
            ClientSessionToken.instance = new ClientSessionToken()
        }
        return ClientSessionToken.instance
    }

    public getAccessToken(): string | null {
        if (!isClient) return null
        return this.access_token
    }

    public getRefreshToken(): string | null {
        if (!isClient) return null
        return this.refresh_token
    }

    public setAccessToken(token: string): void {
        if (!isClient) throw new Error('Not running in client environment')
        this.access_token = token
        localStorage.setItem('access_token', token)
    }

    public setRefreshToken(token: string): void {
        if (!isClient) throw new Error('Not running in client environment')
        this.refresh_token = token
        localStorage.setItem('refresh_token', token)
    }

    public getUserProfile(): AuthUserType | null {
        if (!isClient) return null
        return this.user_profile
    }

    public setUserProfile(profile: AuthUserType | null): void {
        if (!isClient) throw new Error('Not running in client environment')
        this.user_profile = profile
        localStorage.setItem(LocalStorageKeys.USER_PROFILE, JSON.stringify(profile))
    }

    public clearStorage(): void {
        if (!isClient) return
        this.access_token = null
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN)
        this.refresh_token = null
        localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN)
        this.user_profile = null
        localStorage.removeItem(LocalStorageKeys.USER_PROFILE)
    }
}

const clientSessionToken = ClientSessionToken.getInstance()

export default clientSessionToken
