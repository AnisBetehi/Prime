import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loading: true,
        visibleComponent: 'News Feed'
    },
    reducers: {
        setLoading: (state , {payload}) => {
            state.loading = payload;
        },

        setVisibleComponent: (state, {payload}) => {
            state.visibleComponent = payload;
        }
    }
})


export const {setLoading, setVisibleComponent} = uiSlice.actions;

export default uiSlice.reducer;