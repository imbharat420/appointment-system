import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/AuthSlice'
import postReducer from './features/PostSlice'
// import profileReducer from './features/ProfileSlice'
// import cmsSlice from './features/cmsSlice'

const persistMiddleware = (store) => (next) => (action) => {
    const result = next(action)
    const { token } = store.getState().auth
    localStorage.setItem('token', token)
    return result
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistMiddleware),
})

export default store
