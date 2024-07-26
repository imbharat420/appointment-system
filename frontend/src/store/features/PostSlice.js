import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiPost from '../../api/post.api'

export const getPosts = createAsyncThunk('/post/getPosts', async (params) => {
    console.log("dsfgdsg", params)
    const { data } = await apiPost.getAll(params)
    return { ...data, params }
})

const initialState = {
    posts: [],
    paginationPosts: {
        activePage: 1,
        totalPage: 1,
    }
}

const updatePosts = (state, { payload }) => {
    state.posts = payload?.posts
    state.paginationPosts = {
        activePage: payload.params.current_page || 0,
        totalPage: Math.ceil(payload.totalCount / payload.params.per_page) || 0,
    };
}

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, updatePosts)
    },
})

export const { } = postSlice.actions

export default postSlice.reducer
