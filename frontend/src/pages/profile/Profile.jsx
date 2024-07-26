import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../../store/features/AuthSlice'
import MyProfile from './MyProfile'
function Profile() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useDispatch()
    const { user, userById } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userId == undefined) return
        if (user.id == userId) {
            navigate('/profile')
            return
        } else {
            dispatch(getUserById({ id: userId }))
        }
    }, [userId])

    return <MyProfile user={userId ? userById : user} />
}

export default Profile
