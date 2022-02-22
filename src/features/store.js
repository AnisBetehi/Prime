import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import uiReducer from './ui';
import postsReducer from './posts';
import allUsersReducer from './allUsers';
import allChatsReducer from './allChats'

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
        posts: postsReducer,
        allUsers: allUsersReducer,
        allChats: allChatsReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })

})