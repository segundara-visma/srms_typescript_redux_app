import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import userReducer from '../features/user/userSlice';
import studentReducer from '../features/student/studentSlice';
import paginationReducer from '../features/pagination/paginationSlice';
import tutorReducer from '../features/tutor/tutorSlice';
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // // Ignore these action types
        // ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.data'],
        // Ignore these paths in the state
        ignoredPaths: ['student.pdfData.data'],
      },
    }),
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    user: userReducer,
    student: studentReducer,
    tutor: tutorReducer,
    admin: adminReducer,
    pagination: paginationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
