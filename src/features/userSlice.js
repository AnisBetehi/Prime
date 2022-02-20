import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userName: undefined,
        email: undefined,
        userId: undefined,
        photo: undefined
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.userName = payload.userName;
            state.isLoggedIn = true;
            state.userId = payload.userId;
            state.email = payload.email;
            state.photo = payload.photo;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userName = undefined;
            state.userId = undefined;
            state.email = undefined;
            state.photo = undefined;
        }
    }
})


export const {setUser, logoutUser} = userSlice.actions;

export default userSlice.reducer;