import { HttpStatusCode } from '@/constants/http.enum'
import { isPayloadErrorWithDetail, isPayloadErrorWithMessage } from '@/store/utils/errorSafeType'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface ReadableErrorMessageReturn {
    title: string
    description: string
}
export function formatFetchBaseQueryErrorMessage(error: FetchBaseQueryError): ReadableErrorMessageReturn {
    const silentStatuses = [
        HttpStatusCode.UNAUTHORIZED,
        HttpStatusCode.FORBIDDEN,
        HttpStatusCode.ENTITY_ERROR,
        HttpStatusCode.TOO_MANY_REQUESTS
    ]
    if (typeof error.status === 'string' || silentStatuses.includes(error.status)) {
        return {
            title: 'Unknown Error',
            description: 'An unknown error occurred'
        }
    }

    if (error.status >= 500) {
        return {
            title: 'Server Error',
            description: 'Please try again later.'
        }
    }

    if (isPayloadErrorWithMessage(error)) {
        return {
            title: 'Error Occurred',
            description: error.data.message
        }
    }

    if (isPayloadErrorWithDetail(error)) {
        return {
            title: error.data.title,
            description: error.data.detail
        }
    }

    return {
        title: 'Unknown Error',
        description: 'An unknown error occurred'
    }
}
