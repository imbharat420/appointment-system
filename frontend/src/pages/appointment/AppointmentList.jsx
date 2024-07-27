import React, { useEffect } from 'react'
import { getAppointments } from '../../store/features/AppointmentSlice'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'

function AppointmentList() {
    const { appointments } = useSelector((state) => state.appointments)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppointments())
    }, [dispatch])

    const handleAction = (id, action) => {
        console.log(`Appointment ID: ${id}, Action: ${action}`)
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-heading">Appointment List</h2>
            <h6 className="mb-4 text-secondary">List of bookings</h6>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <ul className="nav nav-pills mb-3 nav-type justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            Upcoming
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Pending
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Recurring
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Past
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Cancelled
                        </a>
                    </li>
                </ul>
                <div>
                    <Link to={`/create-appointment`} className="btn btn-danger">
                        Create Appointment
                    </Link>
                </div>
            </div>
            <div className="row">
                {appointments.map((appointment) => (
                    <div className="col-12 mb-3" key={appointment?.id}>
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="card-title mb-1">
                                            {appointment?.date}
                                        </h5>
                                        <p className="text-muted mb-1">
                                            <i className="far fa-clock"></i>{' '}
                                            {appointment?.time}
                                        </p>
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
                                    <Dropdown />
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
