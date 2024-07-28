import { Navigate, useRoutes } from 'react-router-dom'

import { useSelector } from 'react-redux'

import Profile from '../pages/profile/Profile'

import PrivateLayout from '../components/layout/PrivateLayout'

import AppointmentList from '../pages/appointment/AppointmentList'
import AppointmentForm from '../pages/appointment/AppointmentForm'

const AuthPrivateRoute = () => {
    const { user } = useSelector((state) => state.auth)
    const PrivateRoutes = [
        {
            element: <PrivateLayout />,
            children: [
                {
                    path: '/profile',
                    element: <Profile />,
                },
                {
                    path: '/feed',
                    element: <AppointmentList />,
                },
                {
                    path: '/create-appointment',
                    element: <AppointmentForm />,
                },
            ],
        },
        {
            path: '*',
            element: <Navigate to="feed" replace />,
        },
    ]
    let routes = useRoutes(PrivateRoutes)

    return <>{routes}</>
}

export default AuthPrivateRoute
