import { configureStore } from "@reduxjs/toolkit";
import intakesReducer from '../features/intakesSlice'
import foodsReducer from '../features/foodsSlice'
import listReducer from '../features/listSlice'

export const store = configureStore({
    reducer:{
        intakes: intakesReducer,
        foods: foodsReducer,
        list: listReducer
    }
})