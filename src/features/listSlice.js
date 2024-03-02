import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: ""
}

export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        saveFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
})

export const {saveFilter} = listSlice.actions;

export default listSlice.reducer;