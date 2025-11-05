import { EntityError } from '@/types/common/http-response'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error
}

export function isEntityError(error: unknown): error is EntityError {
    return (
        isFetchBaseQueryError(error) &&
        error.status === 422 &&
        typeof error.data === 'object' &&
        error.data !== null &&
        !(error.data instanceof Array)
    )
}

export function isActionHttpErrorWithMessage(
    action: unknown
): action is { payload: { data: { message: string }; status: number } } {
    return (
        typeof action === 'object' &&
        action !== null &&
        'payload' in action &&
        typeof action.payload === 'object' &&
        action.payload !== null &&
        'data' in action.payload &&
        'status' in action.payload &&
        typeof action.payload.data === 'object' &&
        action.payload.data !== null &&
        'message' in action.payload.data &&
        typeof action.payload.data.message === 'string'
    )
}

export function isActionHttpErrorWithDetail(
    action: unknown
): action is { payload: { data: { title: string; detail: string }; status: number } } {
    return (
        typeof action === 'object' &&
        action !== null &&
        'payload' in action &&
        typeof action.payload === 'object' &&
        action.payload !== null &&
        'data' in action.payload &&
        'status' in action.payload &&
        typeof action.payload.data === 'object' &&
        action.payload.data !== null &&
        'title' in action.payload.data &&
        'detail' in action.payload.data &&
        typeof action.payload.data.title === 'string' &&
        typeof action.payload.data.detail === 'string'
    )
}
