import { configureStore } from "@reduxjs/toolkit";
import { albumReducer } from "./albumReducer";


export const store = configureStore({
    reducer:{
        albumReducer:albumReducer,
    }
});