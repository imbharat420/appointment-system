import React, { useEffect, useState } from 'react'
import { getAppointments } from '../../store/features/AppointmentSlice'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import {
    formatDate,
    formatTime,
    getDate,
    getDay,
    getMonth,
} from '../../utils/helpers'
const tabs = [
    { type: 'all', label: 'All' },
    { type: 'upcoming', label: 'Upcoming', note: '(3 days)' },
    { type: 'pending', label: 'Pending' },
    { type: 'past', label: 'Past' },
]
function AppointmentList() {
    const [state, setState] = useState('all')
    const { appointments } = useSelector((state) => state.appointments)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppointments(state))
    }, [dispatch, state])

    const handleAction = (id, action) => {
        console.log(`Appointment ID: ${id}, Action: ${action}`)
    }

    return (
        <div className="container mt-4">
            <h2 className="text-heading">Appointment List</h2>
            <h6 className="mb-4 text-secondary">
                List of {user?.role} Appointments
            </h6>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <ul className="nav nav-pills mb-3 nav-type justify-content-center">
                    {tabs.map((tab) => (
                        <li className="nav-item" key={tab.type}>
                            <a
                                className={`nav-link ${
                                    state === tab.type ? 'active' : ''
                                }`}
                                href="#"
                                onClick={() => setState(tab.type)}
                            >
                                {tab.label}{' '}
                                {tab.note && (
                                    <span className="fs-6 text-danger">
                                        {tab.note}
                                    </span>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
                <div>
                    {user?.role == 'Student' ? (
                        <Link
                            to={`/create-appointment`}
                            className="btn btn-danger"
                        >
                            Create Appointment
                        </Link>
                    ) : null}
                </div>
            </div>
            <div className="row">
                {appointments.map((appointment) => (
                    <div className="col-12 mb-3" key={appointment?.id}>
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex">
                                        <div
                                            className="me-5 d-flex flex-1 justify-content-center align-items-center flex-column border-end border-1"
                                            style={{ width: 200 }}
                                        >
                                            <h5 className="card-title mb-1 ">
                                                {getDay(appointment?.date)}
                                            </h5>

                                            <h5 className="card-title fs-2 mb-1 text-danger">
                                                {getDate(appointment?.date)}
                                            </h5>
                                            <p className="text-muted mb-1">
                                                <i className="far fa-clock"></i>{' '}
                                                {
                                                    formatTime(
                                                        appointment?.time
                                                    ).time12Hour
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="card-title mb-1">
                                                <i class="fa-solid fa-message"></i>{' '}
                                                {appointment.topic}
                                            </h5>

                                            <p className="mb-1">
                                                <i className="fas fa-user-tie"></i>{' '}
                                                <strong>Teacher:</strong>{' '}
                                                {appointment?.teacher?.name}
                                            </p>
                                            <p className="mb-1">
                                                <i className="fas fa-user"></i>{' '}
                                                <strong>Student:</strong>{' '}
                                                {appointment?.student?.name}
                                            </p>
                                            <p className="mb-1">
                                                <i class="fa-solid fa-calendar-days me-1"></i>
                                                <strong>Date:</strong>{' '}
                                                {formatDate(
                                                    appointment?.date,
                                                    'YYYY MMM DD'
                                                )}
                                            </p>
                                            <p className="text-muted mb-1">
                                                <i className="fas fa-info-circle"></i>{' '}
                                                <strong>Status:</strong>
                                                <span
                                                    className={`badge ms-2 ${
                                                        appointment?.status ===
                                                        'Pending'
                                                            ? 'badge-warning'
                                                            : 'badge-success'
                                                    } ml-2`}
                                                >
                                                    {appointment?.status}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    {user?.role == 'Teacher' ? (
                                        <Dropdown
                                            appointment={appointment}
                                            state={state}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppointmentList
