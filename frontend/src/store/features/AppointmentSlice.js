import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAppointment from '../../api/appointment.api'

export const getAppointments = createAsyncThunk(
    '/appointment/getAppointments',
    async (params) => {
        const { data } = await apiAppointment.getAll(params)
        return data
    }
)

const initialState = {
    appointments: [],
}

const updateAppointments = (state, { payload }) => {
    state.appointments = payload?.appointments
}

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAppointments.fulfilled, updateAppointments)
    },
})

export const {} = appointmentSlice.actions

export default appointmentSlice.reducer
