import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyProfile from './MyProfile'
function Profile() {
    const { user } = useSelector((state) => state.auth)

    return <MyProfile user={user} />
}

export default Profile
