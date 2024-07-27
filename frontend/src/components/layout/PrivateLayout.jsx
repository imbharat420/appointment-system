import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/features/AuthSlice'
import Sidebar from '../Sidebar'
function PrivateLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />

            <Outlet />
        </div>
    )
}

export default PrivateLayout
