import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../store/features/AuthSlice'

import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

export default function Router() {
    const { token } = useSelector((state) => state.auth)

    return <>{token ? <PrivateRoutes /> : <PublicRoutes />}</>
}
