import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  status: 'idle' | 'loading' | 'failed';
  errorMessage: string|null;
  me: MeType;
}

interface MeType {
    firstname: string;
    lastname: string;
    email: string;
    dateofbirth: string;
    nationality: string;
    image: string;
    _id: string;
}

const initialState: UserState = {
  status: 'idle',
  errorMessage: null,
  me: {
    firstname: '',
    lastname: '',
    email: '',
    dateofbirth: '',
    nationality: '',
    image: '',
    _id: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMe: (state, action: PayloadAction<MeType>) => {
      state.status = 'loading';
      state.me = action.payload;
      state.status = 'idle';
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    clearMeData: (state) => {
      state.status = 'loading';
      state.me = {
        firstname: '',
        lastname: '',
        email: '',
        dateofbirth: '',
        nationality: '',
        image: '',
        _id: '',
      };
      state.status = 'idle';
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    }
  },
});

export const { setMe, clearMeData, setErrorMessage, clearErrorMessage } = userSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.user.value)`
export const selectMe = (state: RootState) => state.user.me;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectErrorMessage = (state: RootState) => state.user.errorMessage;

export default userSlice.reducer;