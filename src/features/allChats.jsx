import { createSlice } from "@reduxjs/toolkit";


const allChatsSlice = createSlice({
    name: 'allChats',
    initialState: [],
    reducers: {
        setAllChats: (state, {payload}) => {
            return payload
        }
    }
})

export const {setAllChats} = allChatsSlice.actions;

export default allChatsSlice.reducer;