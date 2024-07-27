// Sidebar.js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const handlelogout = () => {
        dispatch(logout())
    }
    return (
        <div
            className="d-flex flex-column vh-100 p-3 bg-light sticky-top"
            style={{ width: '250px' }}
        >
            <a
                href="#"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
            >
                <span className="fs-4">Event Management</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link sidebar-btn active">
                        Bookings
                    </a>
                </li>
            </ul>
            <ul className="nav nav-pills flex-column mt-auto">
                <li className="my-auto">
                    <button className="btn btn-outline-primary btn-block w-100">
                        Edit Account
                    </button>
                </li>
                <li className="my-auto mt-2">
                    <button
                        className="btn btn-danger btn-block w-100"
                        onClick={handlelogout}
                    >
                        {user?.name}, Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
