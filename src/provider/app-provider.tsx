'use client'

import { createContext, useContext, useState } from 'react'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/provider/theme-provider'
import StoreProvider from '@/provider/store-provider'

type AuthStatus = 'ready' | 'loading'
interface AppContextType {
    authStatus: AuthStatus
}

const AppContext = createContext<AppContextType>({
    authStatus: 'loading'
})

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading')

    return (
        <StoreProvider>
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
