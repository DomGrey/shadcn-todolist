import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  selectedCategory: string;
  selectedStatus: string;
}

const initialState: FilterState = {
  selectedCategory: "All",
  selectedStatus: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.selectedStatus = action.payload;
    },
  },
});

export const { setCategoryFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
