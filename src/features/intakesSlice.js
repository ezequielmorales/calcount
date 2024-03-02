import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    intakes: []
}

export const intakesSlice = createSlice({
    name: "intakes",
    initialState,
    reducers: {
        saveIntakes: (state, action) => {
            state.intakes = action.payload;
        },
        saveIntake: (state, action) => {
            state.intakes.push(action.payload);
        },
        deleteIntake: (state, action) => {
            state.intakes = state.intakes.filter(intake => intake.id !== action.payload);
        }
    }
})

export const {saveIntake, saveIntakes, deleteIntake} = intakesSlice.actions;

export default intakesSlice.reducer;