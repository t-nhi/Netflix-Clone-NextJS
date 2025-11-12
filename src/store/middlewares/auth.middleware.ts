import clientSessionToken from '@/services/storage/clientSessionToken'
import { storeApiType } from '@/store'
import { setLoggedOutAction, setRole, setUserProfile, tokenReceived } from '@/store/features/authSlice'
import {
    isLoginMutationAction,
    isLogoutMutationAction,
    isSetAccessTokenAction,
    isSetUserProfileAction,
    isSignUpMutationAction,
    isTokenReceivedAction
} from '@/store/utils/safeType'
import { JwtPayloadType } from '@/types/common/jwt-payload.type'
import { decodeJwt } from '@/utils/jwt.util'
import { Middleware } from '@reduxjs/toolkit'

export const authMiddleware: Middleware = (storeAPI: storeApiType) => (next) => (action) => {
    if (isTokenReceivedAction(action)) {
        const { access_token, refresh_token } = action.payload
        clientSessionToken.setAccessToken(access_token)
        clientSessionToken.setRefreshToken(refresh_token)
        return next(action)
    }

    if (isSetAccessTokenAction(action)) {
        const access_token = action.payload
        clientSessionToken.setAccessToken(access_token)
        return next(action)
    }

    if (isSetUserProfileAction(action)) {
        const userProfile = action.payload
        clientSessionToken.setUserProfile(userProfile)
        return next(action)
    }

    if (isLoginMutationAction(action)) {
        const { user, access_token, refresh_token } = action.payload.data
        storeAPI.dispatch(tokenReceived({ access_token, refresh_token }))
        const accessTokenDecoded = decodeJwt<JwtPayloadType>(access_token) as JwtPayloadType
        storeAPI.dispatch(setRole(accessTokenDecoded.role))
        storeAPI.dispatch(setUserProfile(user))
        return next(action)
    }

    if (isSignUpMutationAction(action)) {
        const { user, access_token, refresh_token } = action.payload.data
        const accessTokenDecoded = decodeJwt<JwtPayloadType>(access_token)

        storeAPI.dispatch(tokenReceived({ access_token, refresh_token }))
        storeAPI.dispatch(setUserProfile(user))
        storeAPI.dispatch(setRole(accessTokenDecoded!.role))

        return next(action)
    }

    if (isLogoutMutationAction(action)) {
        storeAPI.dispatch(setLoggedOutAction())
        clientSessionToken.clearStorage()
        return next(action)
    }

    return next(action)
}
