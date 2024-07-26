import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../../store/features/AuthSlice'
import apiAuth from '../../api/auth.api'
import { toast } from 'react-toastify'
import errorHandler from '../../utils/errorHandler'
function MyProfile({ user }) {
    const handleFollow = async () => {
        try {
            await apiAuth.follow({ userId: user?.id })
            toast.success('You Followed ' + user?.username)
        } catch (err) {
            errorHandler(err)
        }
    }

    return (
        <div>
            <h1 className="text-center">{user?.myprofile && 'My '}Profile</h1>
            <div className="container">
                <div className="card profile-card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {' '}
                            {user?.myprofile && 'Welcome Back, '}
                            {user?.username}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {user?.email}
                        </h6>
                        {user?.myprofile ? null : (
                            <button
                                className="btn btn-primary"
                                onClick={handleFollow}
                            >
                                Follow
                            </button>
                        )}
                        <p className="card-text">Followers:</p>
                        {user?.followers?.length ? (
                            <ul className="followers-list">
                                {user?.followers.map((follower) => (
                                    <li>
                                        <strong>{follower?.username}</strong>
                                        <br />
                                        <small>{follower?.email}</small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-danger ms-2">😀 No followers </p>
                        )}
                        <p className="card-text mt-3">Following:</p>
                        {user?.followings?.length ? (
                            <ul className="followers-list">
                                {user?.followings.map((following) => (
                                    <li>
                                        <strong>{following?.username}</strong>
                                        <br />
                                        <small>{following?.email}</small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-danger ms-2">
                                😀 No followings{' '}
                            </p>
                        )}
                    </div>
                    <div className="card-footer">
                        <Link
                            to={'/feed'}
                            className="btn btn-primary btn-block mt-2"
                        >
                            Check Feed
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
