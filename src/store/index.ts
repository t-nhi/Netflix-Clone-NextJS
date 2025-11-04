import videoReducer from '@/store/features/video.slice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
    return configureStore({
        devTools: true,
        reducer: {
            video: videoReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
