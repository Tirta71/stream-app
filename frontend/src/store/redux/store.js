import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice.js";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;
