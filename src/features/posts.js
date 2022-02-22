import { createSlice } from "@reduxjs/toolkit";


const PostsSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {
        setPosts: (state, {payload}) => {
            return payload;
        },
        addPost: (state, {payload}) => {
            state.push(payload);
        }
    }
})


export const {setPosts, addPost} = PostsSlice.actions;

export default PostsSlice.reducer;
