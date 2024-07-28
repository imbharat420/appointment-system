import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAuth from '../../api/auth.api'
import errorHandler from '../../utils/errorHandler'

export const getUser = createAsyncThunk('/auth/getUser', async () => {
    const { data } = await apiAuth.getProfile()
    return data.user
})

const token = localStorage.getItem('token')

const initialState = {
    token: token ?? '',
    user: {
        id: '',
        username: '',
        email: '',
        phone: '',
        role: '',
    },
}

const updateUser = (state, { payload }) => {
    state.user = { ...payload, myprofile: true }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token
            state.user = { ...action.payload.user, myprofile: true }
        },
        logout(state) {
            state.token = ''
            state.user = initialState.user
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, updateUser)
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
