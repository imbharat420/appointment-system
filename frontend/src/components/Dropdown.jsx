import React, { useState } from 'react'
import apiAppointment from '../api/appointment.api'
import errorHandler from '../utils/errorHandler'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getAppointments } from '../store/features/AppointmentSlice'
function Dropdown({ appointment, state }) {
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()

    const handleAction = async (id, action) => {
        console.log(id)
        try {
            await apiAppointment.edit({ appointmentId: id, status: action })
            setOpen(!open)
            dispatch(getAppointments(state))
            toast.success(`Appointment successfully ` + action)
        } catch (err) {
            errorHandler(err)
        }
    }
    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                onClick={() => setOpen(!open)}
            >
                Edit
            </button>
            <div
                id="dropdown"
                className={`dropdown-menu dropdown-menu-left ${
                    open ? 'show' : ''
                }`}
                aria-labelledby="dropdownMenuButton"
            >
                <button
                    className="dropdown-item"
                    onClick={() => handleAction(appointment?.id, 'Accept')}
                >
                    Accept
                </button>
                <button
                    className="dropdown-item"
                    onClick={() => handleAction(appointment?.id, 'Reject')}
                >
                    Reject
                </button>
            </div>
        </div>
    )
}

export default Dropdown
