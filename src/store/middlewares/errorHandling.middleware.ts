import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import {
    isActionHttpErrorWithMessage,
    isFetchBaseQueryError,
    isActionHttpErrorWithDetail
} from '../utils/errorSafeType'
import { HttpStatusCode } from '@/constants/http.enum'

export const errorHandleMiddleware: Middleware = () => (next) => (action) => {
    if (!isRejectedWithValue(action)) return next(action)

    if (!isFetchBaseQueryError(action.payload)) return next(action)

    if (typeof action.payload.status === 'string') return next(action)

    const status = action.payload.status as HttpStatusCode

    const silentStatuses = [
        HttpStatusCode.UNAUTHORIZED,
        HttpStatusCode.FORBIDDEN,
        HttpStatusCode.NOT_FOUND,
        HttpStatusCode.ENTITY_ERROR,
        HttpStatusCode.TOO_MANY_REQUESTS
    ]
    if (silentStatuses.includes(status)) {
        console.error('error log from store middleware :', action.payload)
        return next(action)
    }

    if (status >= 500) {
        console.error('error log from store middleware :', action.payload)
        toast.error('server error', { description: 'Please try again later.' })
        return next(action)
    }

    if (isActionHttpErrorWithMessage(action)) {
        const { message } = action.payload.data
        toast.error(message)
        return next(action)
    }

    if (isActionHttpErrorWithDetail(action)) {
        const { title, detail } = action.payload.data
        toast(title, { description: detail })
        return next(action)
    }

    return next(action)
}
