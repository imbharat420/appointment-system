import { Navigate, useRoutes } from 'react-router-dom'

import { useSelector } from 'react-redux'

import Profile from '../pages/profile/Profile'

import PrivateLayout from '../components/layout/PrivateLayout'
import Feed from '../pages/posts/Feed'

const AuthPrivateRoute = () => {
    const { user } = useSelector((state) => state.auth)
    const PrivateRoutes = [
        {
            element: <PrivateLayout />,
            children: [
                {
                    path: '/profile/:userId',
                    element: <Profile />,
                },
                {
                    path: '/profile',
                    element: <Profile />,
                },
                {
                    path: '/feed',
                    element: <Feed />,
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
