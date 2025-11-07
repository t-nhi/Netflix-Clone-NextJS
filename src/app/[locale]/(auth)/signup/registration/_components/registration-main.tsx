'use client'

import { useState } from 'react'
import VerifyTokenContent from './verify-token-content'
import { VerifySuccessContent } from './verify-success-content'

export default function RegistrationMain() {
    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)

    return (
        <div className='flex  items-center justify-center '>
            {isTokenValid != true && (
                <VerifyTokenContent setIsTokenValid={setIsTokenValid} isTokenValid={isTokenValid} />
            )}
            {isTokenValid === true && <VerifySuccessContent />}
        </div>
    )
}
