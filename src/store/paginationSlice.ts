import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  todosPerPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  todosPerPage: 5,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTodosPerPage: (state, action: PayloadAction<number>) => {
      state.todosPerPage = action.payload;
    },
  },
});

export const { setCurrentPage, setTodosPerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
