import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userName: undefined,
        email: undefined,
        userId: undefined,
        photo: undefined,
        aboutMe: undefined,
        website: undefined
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.userName = payload.userName;
            state.isLoggedIn = true;
            state.userId = payload.userId;
            state.email = payload.email;
            state.photo = payload.photo;
            state.description = payload.description;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userName = undefined;
            state.userId = undefined;
            state.email = undefined;
            state.photo = undefined;
        },
        changeProfilePhoto: (state, {payload}) => {
            state.photo = payload;
        },
        updateCurrentUserProfile: (state ,{payload}) => {
            state.website = payload.website;
            state.aboutMe = payload.aboutMe;
        }
    }
})


export const {setUser, logoutUser, changeProfilePhoto, updateCurrentUserProfile} = userSlice.actions;

export default userSlice.reducer;