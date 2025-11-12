'use client'

import { SearchParamsLoader, useSearchParamsLoader } from '@/components/search-params-loader'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setAccessToken } from '@/store/features/authSlice'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useLogoutMutation } from '@/store/services/proxy-auth.services'
import { handleRefreshToken as refreshToken } from '@/helper/handleRefreshToken'
import { QueryKeys } from '@/constants/query-keys.constant'

export default function RefreshToken() {
    const refreshTokenFormStore = useAppSelector((state) => state.auth.refresh_token)
    const { searchParams, setSearchParams } = useSearchParamsLoader()
    const refreshTokenQuery = searchParams?.get(QueryKeys.REFRESH_TOKEN)
    const redirectQuery = searchParams?.get(QueryKeys.REDIRECT)
    const [logoutMutate] = useLogoutMutation()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleLogout = useCallback(async () => {
        try {
            await logoutMutate()
        } catch (error) {
            console.error('Error logging out:', error)
        } finally {
            router.push('/')
        }
    }, [logoutMutate, router])

    const handleRefreshToken = useCallback(
        async (redirectTo: string | null) => {
            await refreshToken({
                onSuccess: (data) => {
                    const { access_token } = data.data
                    dispatch(setAccessToken(access_token))
                    router.push(redirectTo || '/')
                },
                onError: async () => {
                    try {
                        await logoutMutate().unwrap()
                    } catch (error) {
                        console.error('Error logging out:', error)
                    } finally {
                        router.push('/')
                    }
                }
            })
        },
        [dispatch, logoutMutate, router]
    )

    useEffect(() => {
        if (refreshTokenFormStore && refreshTokenQuery === refreshTokenFormStore) {
            handleRefreshToken(redirectQuery ?? null)
        } else if (refreshTokenFormStore == null && refreshTokenQuery != null) {
            handleLogout()
        } else {
            router.push('/')
        }
    }, [refreshTokenQuery, redirectQuery, refreshTokenFormStore, router, handleLogout])

    return <SearchParamsLoader onParamsReceived={setSearchParams} />
}
