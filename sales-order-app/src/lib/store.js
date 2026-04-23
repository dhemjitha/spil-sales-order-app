import { configureStore } from "@reduxjs/toolkit";
import salesOrderReducer from "./features/salesOrderSlice"

export const store = configureStore({
    reducer: {
        salesOrder: salesOrderReducer,
    }
})