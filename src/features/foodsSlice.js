import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foods: []
}

export const foodsSlice = createSlice({
    name: "foods",
    initialState,
    reducers: {
        saveFoods: (state, action) => {
            state.foods = action.payload;
        }
    }
})

export const {saveFoods} = foodsSlice.actions;

export default foodsSlice.reducer;