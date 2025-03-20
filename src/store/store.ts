import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import filterReducer from "./filterSlice";
import paginationReducer from "./paginationSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
