import { useAppDispatch } from '@/store/hooks'
import { useLogoutMutation } from '@/store/services/proxy-auth.services'
import { LogoutResType } from '@/types/dtos/auth/logout.dto'
import { useCallback } from 'react'

interface UseLogoutProps {
    onLogout?: () => void
    onSuccess?: (data: LogoutResType) => void
    onError?: (error: unknown) => void
}

export function useLogout(props?: UseLogoutProps) {
    const [logoutMutate, logoutResult] = useLogoutMutation()
    const dispatch = useAppDispatch()

    const handleLogout = useCallback(async () => {
        props?.onLogout?.()
        try {
            const res = await logoutMutate().unwrap()
            props?.onSuccess?.(res)
        } catch (error) {
            console.error('Logout error:', error)
            props?.onError?.(error)
        }
    }, [logoutMutate, props, dispatch])

    return {
        handleLogout,
        logoutResult
    }
}
