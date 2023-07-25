import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface LoginState {
  value: string;
  status: 'idle' | 'loading' | 'failed';
  errorMessage: string;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  value: '',
  status: 'idle',
  errorMessage: '',
  isLoggedIn: false
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('userTitle', JSON.stringify(action.payload));
    },
    loginFailure: (state) => {
      state.status = 'failed';
      state.isLoggedIn = false;
    },
    loginErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoggedIn = false;
    },
    logoutSuccess: (state) => {
      state.value = '';
      state.isLoggedIn = false;
    }
  }
});

export const { loginSuccess, loginFailure, loginErrorMessage, logoutSuccess } = loginSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.login.value)`
export const selectValue = (state: RootState) => state.login.value;
export const loggedInStatus = (state: RootState) => state.login.isLoggedIn;
export const authError = (state: RootState) => state.login.errorMessage;

export default loginSlice.reducer;