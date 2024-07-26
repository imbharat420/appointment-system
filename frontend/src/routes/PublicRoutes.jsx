import { Navigate, useRoutes } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Profile from '../pages/profile/Profile'

const AuthPublicRoute = () => {
    const PublicRoutes = [
        {
            element: <AuthLayout />,
            children: [
                { path: '/login', element: <Login /> },
                { path: '/register', element: <Register /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/login" replace />,
        },
    ]
    return useRoutes(PublicRoutes)
}

export default AuthPublicRoute
