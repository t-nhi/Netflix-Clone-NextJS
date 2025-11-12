'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/provider/theme-provider'
import StoreProvider from '@/provider/store-provider'
import clientSessionToken from '@/services/storage/clientSessionToken'
import { decodeJwt } from '@/utils/jwt.util'
import { JwtPayloadType } from '@/types/common/jwt-payload.type'
import { useAppDispatch } from '@/store/hooks'
import { setRole, setUserProfile, tokenReceived } from '@/store/features/authSlice'

type AuthStatus = 'ready' | 'loading'
interface AppContextType {
    authStatus: AuthStatus
}

const AppContext = createContext<AppContextType>({
    authStatus: 'loading'
})

function AppProvider({ children }: { children: React.ReactNode }) {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading')

    const dispatch = useAppDispatch()

    useEffect(() => {
        const accessToken = clientSessionToken.getAccessToken()
        const refreshToken = clientSessionToken.getRefreshToken()
        const userProfile = clientSessionToken.getUserProfile()
        if (!accessToken || !refreshToken) {
            setAuthStatus('ready')
            return
        }
        try {
            const decodedAccessToken = decodeJwt<JwtPayloadType>(accessToken)
            dispatch(tokenReceived({ access_token: accessToken, refresh_token: refreshToken }))
            dispatch(setRole(decodedAccessToken!.role))
            dispatch(setUserProfile(userProfile))
        } catch (error) {
            console.error('Failed to decode JWT:', error)
        } finally {
            setAuthStatus('ready')
        }
    }, [dispatch])

    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <AppContext
                value={{
                    authStatus
                }}
            >
                {children}
                <Toaster />
                <NextTopLoader showSpinner={false} color='var(--color-brand)' />
            </AppContext>
        </ThemeProvider>
    )
}

export default function AppProviderWithStore({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <AppProvider>{children}</AppProvider>
        </StoreProvider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}
