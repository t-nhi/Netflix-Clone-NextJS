import videoReducer from '@/store/features/video.slice'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { proxyAuthApi } from './services/proxy-auth.services'
import { authMiddleware } from './middlewares/auth.middleware'
import { errorHandleMiddleware } from './middlewares/errorHandling.middleware'
import { authApi } from './services/auth.services'
import { UserApi } from './services/user.services'
import { categoryApi } from './services/category.services'

export const makeStore = () => {
    return configureStore({
        devTools: true,
        reducer: {
            video: videoReducer,
            auth: authReducer,
            [proxyAuthApi.reducerPath]: proxyAuthApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            [UserApi.reducerPath]: UserApi.reducer,
            [categoryApi.reducerPath]: categoryApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                proxyAuthApi.middleware,
                authApi.middleware,
                UserApi.middleware,
                categoryApi.middleware,
                authMiddleware,
                errorHandleMiddleware
            )
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type storeApiType = { dispatch: AppDispatch; getState: () => RootState }

export function clearStore(dispatch: AppDispatch) {
    dispatch(proxyAuthApi.util.resetApiState())
    dispatch(authApi.util.resetApiState())
    dispatch(UserApi.util.resetApiState())
    dispatch(categoryApi.util.resetApiState())
}
