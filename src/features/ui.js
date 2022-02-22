import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loading: true,
        visibleComponent: 'News Feed',
        newMessages: false
    },
    reducers: {
        setLoading: (state , {payload}) => {
            state.loading = payload;
        },

        setVisibleComponent: (state, {payload}) => {
            state.visibleComponent = payload;
        },
        setNewMessages: (state, {payload}) => {
            state.newMessages = payload;
        }
    }
})


export const {setLoading, setVisibleComponent, setNewMessages} = uiSlice.actions;

export default uiSlice.reducer;