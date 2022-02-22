import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState: [],
    reducers: {
        setAllUsers: (state, {payload}) => {
            return payload;
        }
    }
})

export const {setAllUsers} = allUsersSlice.actions;

export default allUsersSlice.reducer;