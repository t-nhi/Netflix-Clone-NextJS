'use client '

import AppLoading from '@/components/lotties/app-loading'
import ErrorIcon from '@/components/lotties/error-icon'
import { SearchParamsLoader, useSearchParamsLoader } from '@/components/search-params-loader'
import { QueryKeys } from '@/constants/query-keys.enum'
import { SessionStorageKeys } from '@/constants/session-storage-keys.enum'
import { cn } from '@/lib/utils'
import { useVerifyTokenMutation } from '@/store/services/auth/auth.services'
import { useEffect } from 'react'

interface VerifyTokenContentProps {
    className?: string
    isTokenValid?: boolean | null
    setIsTokenValid?: (isValid: boolean) => void
}
export default function VerifyTokenContent({
    className,
    setIsTokenValid,
    isTokenValid = null
}: VerifyTokenContentProps) {
    const { searchParams, setSearchParams } = useSearchParamsLoader()
    const [verifyTokenMutate] = useVerifyTokenMutation()
    const emailVerificationToken = searchParams?.get(QueryKeys.EMAIL_VERIFICATION_TOKEN)

    const handleVerifyToken = async (token: string) => {
        try {
            const response = await verifyTokenMutate({ token }).unwrap()
            setIsTokenValid?.(true)
            sessionStorage.setItem(SessionStorageKeys.SIGNUP_EMAIL, response.data.email)
            sessionStorage.setItem(SessionStorageKeys.TOKEN_EMAIL_VERIFICATION, token)
        } catch (error) {
            console.error('Error verifying token:', error)
            setIsTokenValid?.(false)
        }
    }

    useEffect(() => {
        if (emailVerificationToken) {
            handleVerifyToken(emailVerificationToken)
        }
    }, [emailVerificationToken])

    return (
        <div className={cn(className, ' flex flex-col items-center ')}>
            <SearchParamsLoader onParamsReceived={setSearchParams} />
            {isTokenValid != false && <AppLoading loop className='size-20' />}
            {isTokenValid == false && <ErrorIcon className='size-20' />}
            <h1 className='text-center font-semibold text-2xl mt-10'>
                {isTokenValid === null
                    ? 'Verifying ...'
                    : isTokenValid
                      ? 'Verification Successful'
                      : 'Verification Failed'}
            </h1>
        </div>
    )
}
