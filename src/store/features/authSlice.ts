import { Role } from '@/constants/role.enum'
import { AuthUserType, UserType } from '@/types/models/user.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    refresh_token: string | null
    access_token: string | null
    role: Role | null
    user_profile: AuthUserType | null
}

const initialState: AuthState = {
    refresh_token: null,
    access_token: null,
    role: null,
    user_profile: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        tokenReceived: (state, action: PayloadAction<{ refresh_token: string; access_token: string }>) => {
            state.refresh_token = action.payload.refresh_token
            state.access_token = action.payload.access_token
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.access_token = action.payload
        },
        setRole: (state, action: PayloadAction<Role | null>) => {
            state.role = action.payload
        },
        setLoggedOutAction: (state) => {
            state.user_profile = null
            state.refresh_token = null
            state.access_token = null
            state.role = null
        },
        setUserProfile: (state, action: PayloadAction<UserType | null>) => {
            state.user_profile = action.payload
        }
    }
})

export const { tokenReceived, setLoggedOutAction, setRole, setUserProfile, setAccessToken } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer
