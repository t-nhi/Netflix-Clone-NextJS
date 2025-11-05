import videoReducer from '@/store/features/video.slice'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { AuthApi } from './services/auth.services'
import { authMiddleware } from './middlewares/auth.middleware'
import { errorHandleMiddleware } from './middlewares/errorHandling.middleware'

export const makeStore = () => {
    return configureStore({
        devTools: true,
        reducer: {
            video: videoReducer,
            auth: authReducer,
            [AuthApi.reducerPath]: AuthApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(AuthApi.middleware, authMiddleware, errorHandleMiddleware)
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type storeApiType = { dispatch: AppDispatch; getState: () => RootState }

export function clearStore(dispatch: AppDispatch) {
    dispatch(AuthApi.util.resetApiState())
}
