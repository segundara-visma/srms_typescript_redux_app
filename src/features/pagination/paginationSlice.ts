import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface PaginationState {
  currentPage: number;
  numOfPages: number;
  maxVisible: number;
  perPage: number;
}

const initialState: PaginationState = {
    currentPage: 1,
    numOfPages: 1,
    maxVisible: 5,
    perPage: 5
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentPage: (state, action: PayloadAction<PaginationState['currentPage']>) => {
      state.currentPage = action.payload;
    },
    setNumOfPages: (state, action: PayloadAction<PaginationState['numOfPages']>) => {
      state.numOfPages = action.payload;
    }
  }
});

export const { setCurrentPage, setNumOfPages } = paginationSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.pagination.value)`
export const selectCurrentPage = (state: RootState) => state.pagination.currentPage;
export const selectNumOfPages = (state: RootState) => state.pagination.numOfPages;
export const selectMaxVisible = (state: RootState) => state.pagination.maxVisible;
export const selectPerPage = (state: RootState) => state.pagination.perPage;

export default paginationSlice.reducer;