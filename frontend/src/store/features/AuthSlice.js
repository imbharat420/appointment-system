import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAuth from '../../api/auth.api'
import errorHandler from '../../utils/errorHandler'

export const getUser = createAsyncThunk('/auth/getUser', async () => {
    const { data } = await apiAuth.getProfile()
    return data.data.user
})

export const getUserById = createAsyncThunk(
    '/auth/getUserById',
    async ({ id }) => {
        try {
            const { data } = await apiAuth.getUserById({ id })
            return data.data.user
        } catch (err) {
            console.log(err)
            errorHandler(err)
        }
    }
)

const token = localStorage.getItem('token')

const initialState = {
    token: token ?? '',
    user: {
        id: '',
        username: '',
        email: '',
        followers: [],
        followings: [],
    },
    userById: {
        id: '',
        username: '',
        email: '',
        followers: [],
        followings: [],
    },
}

const updateUser = (state, { payload }) => {
    state.user = { ...payload, myprofile: true }
}

const updateUserById = (state, { payload }) => {
    state.userById = { ...payload, myprofile: false }
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
        builder
            .addCase(getUser.fulfilled, updateUser)
            .addCase(getUserById.fulfilled, updateUserById)
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
