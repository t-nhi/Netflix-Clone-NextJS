import { LoginResType } from '@/types/dtos/auth/login.dto'
import { SignUpResType } from '@/types/dtos/auth/signUp.dto'
import { AuthUserType } from '@/types/models/user.model'

export function isExecuteMutation(action: unknown): action is {
    type: string
    meta: { arg: { endpointName: string } }
} {
    return (
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        typeof action.type === 'string' &&
        'meta' in action &&
        typeof action.meta === 'object' &&
        action.meta !== null &&
        'arg' in action.meta &&
        typeof action.meta.arg === 'object' &&
        action.meta.arg !== null &&
        'endpointName' in action.meta.arg
    )
}

export function isLogoutMutationAction(action: unknown): action is {
    type: string
    meta: { arg: { endpointName: 'logout' } }
} {
    return (
        isExecuteMutation(action) &&
        action.type.includes('AuthApi/executeMutation/fulfilled') &&
        action.meta.arg.endpointName === 'logout'
    )
}

export function isLoginMutationAction(action: unknown): action is {
    type: string
    meta: { arg: { endpointName: 'login' } }
    payload: LoginResType
} {
    return (
        isExecuteMutation(action) &&
        action.type.includes('AuthApi/executeMutation/fulfilled') &&
        action.meta.arg.endpointName === 'login' &&
        'payload' in action &&
        typeof action.payload === 'object' &&
        action.payload !== null
    )
}

export function isSignUpMutationAction(action: unknown): action is {
    type: string
    meta: { arg: { endpointName: 'register' } }
    payload: SignUpResType
} {
    return (
        isExecuteMutation(action) &&
        action.type.includes('AuthApi/executeMutation/fulfilled') &&
        action.meta.arg.endpointName === 'register' &&
        'payload' in action &&
        typeof action.payload === 'object' &&
        action.payload !== null
    )
}

export function isTokenReceivedAction(
    action: unknown
): action is { type: string; payload: { access_token: string; refresh_token: string } } {
    return (
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        action.type === 'auth/tokenReceived' &&
        'payload' in action &&
        typeof action.payload === 'object' &&
        action.payload !== null &&
        'access_token' in action.payload &&
        'refresh_token' in action.payload
    )
}

export function isSetAccessTokenAction(action: unknown): action is { type: string; payload: string } {
    return (
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        action.type === 'auth/setAccessToken' &&
        'payload' in action &&
        typeof action.payload === 'string'
    )
}

export function isSetUserProfileAction(action: unknown): action is {
    type: string
    payload: AuthUserType | null
} {
    return (
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        action.type === 'auth/setUserProfile' &&
        'payload' in action &&
        (typeof action.payload === 'object' || action.payload === null)
    )
}
