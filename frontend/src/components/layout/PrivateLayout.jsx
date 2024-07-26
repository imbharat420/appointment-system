import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/features/AuthSlice'
function PrivateLayout({ children }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const handlelogout = () => {
        dispatch(logout())
    }
    return (
        <div className="p-3">
            <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-danger" onClick={handlelogout}>
                    {user?.username}, Logout
                </button>
            </div>
            <Outlet />
        </div>
    )
}

export default PrivateLayout
