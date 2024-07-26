import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../store/features/AuthSlice'

import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

export default function Router() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { token } = useSelector((state) => state.auth)
    useEffect(() => {
        if (token) {
            ;(async () => {
                // await dispatch(getUser())
            })()
        }
    }, [dispatch])

    return <>{token ? <PrivateRoutes /> : <PublicRoutes />}</>
}
