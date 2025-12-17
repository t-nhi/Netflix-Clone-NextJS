import videoReducer from '@/store/features/video.slice'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { authMiddleware } from './middlewares/auth.middleware'
import { errorHandleMiddleware } from './middlewares/errorHandling.middleware'
import { authApi } from './services/auth/auth.services'
import { proxyAuthApi } from './services/auth/proxy-auth.services'
import { userApi } from './services/user/user.services'
import { actorApi } from './services/actor/actor.services'
import { categoryApi } from './services/category/category.services'
import { movieApi } from './services/movie/movie.services'
import { directorApi } from './services/director/director.services'
import { uploadApi } from './services/upload/upload.services'
import { accountApi } from '@/store/services/manager-account/manager-account.services'
import { roleApi } from '@/store/services/role/role.services'
import { subscriptionApi } from '@/store/services/payment/plans/subscriptionplan.services'
import { favoriteApi } from '@/store/services/favorite/favorite.services'

export const makeStore = () => {
    return configureStore({
        devTools: true,
        reducer: {
            video: videoReducer,
            auth: authReducer,
            [proxyAuthApi.reducerPath]: proxyAuthApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
            [actorApi.reducerPath]: actorApi.reducer,
            [categoryApi.reducerPath]: categoryApi.reducer,
            [movieApi.reducerPath]: movieApi.reducer,
            [directorApi.reducerPath]: directorApi.reducer,
            [uploadApi.reducerPath]: uploadApi.reducer,
            [accountApi.reducerPath]: accountApi.reducer,
            [roleApi.reducerPath]: roleApi.reducer,
            [subscriptionApi.reducerPath]: subscriptionApi.reducer,
            [favoriteApi.reducerPath]: favoriteApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                proxyAuthApi.middleware,
                authApi.middleware,
                userApi.middleware,
                actorApi.middleware,
                categoryApi.middleware,
                movieApi.middleware,
                directorApi.middleware,
                uploadApi.middleware,
                accountApi.middleware,
                roleApi.middleware,
                subscriptionApi.middleware,
                favoriteApi.middleware,
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
    dispatch(userApi.util.resetApiState())
    dispatch(actorApi.util.resetApiState())
    dispatch(categoryApi.util.resetApiState())
    dispatch(movieApi.util.resetApiState())
    dispatch(directorApi.util.resetApiState())
    dispatch(uploadApi.util.resetApiState())
    dispatch(accountApi.util.resetApiState())
    dispatch(roleApi.util.resetApiState())
    dispatch(subscriptionApi.util.resetApiState())
    dispatch(favoriteApi.util.resetApiState())
}
