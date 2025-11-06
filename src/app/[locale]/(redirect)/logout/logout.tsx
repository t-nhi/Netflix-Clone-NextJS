'use client'

import { SearchParamsLoader, useSearchParamsLoader } from '@/components/search-params-loader'
import { QueryKeys } from '@/constants/query-keys.constant'
import { useLogout } from '@/hooks/data/useAuth'
import { useRouter } from '@/i18n/navigation'
import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'

export default function Logout() {
    const router = useRouter()
    const { searchParams, setSearchParams } = useSearchParamsLoader()
    const accessTokenFromStore = useAppSelector((state) => state.auth.access_token)
    const refreshTokenFromStore = useAppSelector((state) => state.auth.refresh_token)
    const accessToken = searchParams?.get(QueryKeys.ACCESS_TOKEN)
    const refreshToken = searchParams?.get(QueryKeys.REFRESH_TOKEN)
    const { handleLogout } = useLogout({
        onSuccess: () => {
            router.push('/')
        }
    })
    useEffect(() => {
        if (
            (accessToken && accessTokenFromStore === accessToken) ||
            (refreshToken && refreshTokenFromStore === refreshToken)
        ) {
            handleLogout()
        } else {
            router.push('/')
        }
    }, [handleLogout, accessToken, refreshToken, router, accessTokenFromStore, refreshTokenFromStore])
    return <SearchParamsLoader onParamsReceived={setSearchParams} />
}
