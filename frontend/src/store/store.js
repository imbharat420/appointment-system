import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/AuthSlice'
import appointmentReducer from './features/AppointmentSlice'

const persistMiddleware = (store) => (next) => (action) => {
    const result = next(action)
    const { token } = store.getState().auth
    localStorage.setItem('token', token)
    return result
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        appointments: appointmentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistMiddleware),
})

export default store
