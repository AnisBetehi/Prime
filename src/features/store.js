import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import uiReducer from './ui';
import postsReducer from './posts';

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
        posts: postsReducer
    }
})