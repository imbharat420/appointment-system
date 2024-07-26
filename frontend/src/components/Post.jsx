import { useDispatch } from 'react-redux'
import apiPost from '../api/post.api'
import { getPosts } from '../store/features/PostSlice'
import { Link } from 'react-router-dom'
const Post = ({ post }) => {
    const dispatch = useDispatch()
    const handleLike = async () => {
        await apiPost.like({ postId: post.id })
        dispatch(getPosts())
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/profile/${post?.user?.id}`}>
                        {post?.user?.username}
                    </Link>
                </h5>
                <p className="card-text">{post?.content}</p>
                <button className="btn btn-primary" onClick={handleLike}>
                    Like {post?.likes?.length}
                </button>
            </div>
        </div>
    )
}

export default Post
