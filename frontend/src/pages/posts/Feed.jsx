import React, { useState, useEffect } from 'react'
import Post from './../../components/Post'
import { getPosts } from '../../store/features/PostSlice'
import { useDispatch, useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import Pagination from '../../components/Pagination'

const Feed = () => {
    const perPage = 20
    const dispatch = useDispatch()
    const { posts, paginationPosts } = useSelector((state) => state.post)
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        const params = {
            per_page: perPage,
            current_page: paginationPosts.activePage,
        }
        dispatch(getPosts(params))
    }

    const handlePageChange = (type, newPage) => {
        const params = {
            per_page: perPage,
            current_page: paginationPosts.activePage,
        }

        const isNextPage =
            type === 'next' &&
            paginationPosts.activePage < paginationPosts.totalPage
        const isPrevPage = type === 'prev' && paginationPosts.activePage > 1
        const isGoPage = type === 'go'

        if (isNextPage || isPrevPage || isGoPage) {
            params.current_page = newPage
        }

        dispatch(getPosts(params))
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <CreatePost />
                    <h2>Feed</h2>

                    {posts.length ? (
                        posts?.map((post) => <Post key={post.id} post={post} />)
                    ) : (
                        <h1 className="text-center">No Post Found</h1>
                    )}
                </div>
            </div>
            <Pagination
                current={paginationPosts.activePage}
                totalPages={paginationPosts.totalPage}
                next={() =>
                    handlePageChange('next', paginationPosts.activePage + 1)
                }
                prev={() =>
                    handlePageChange('prev', paginationPosts.activePage - 1)
                }
                go={(pageNumber) => handlePageChange('go', pageNumber)}
            />
        </div>
    )
}

export default Feed
