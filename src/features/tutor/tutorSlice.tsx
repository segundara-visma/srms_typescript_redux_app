import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TutorState {
  status: 'idle' | 'loading' | 'failed';
  totalStudentsByCourse: any[]|null;
  myStudentsList: any[]|null;
  myCourseList: any[]|null;
  examsRecords: any[]|null;
  totalStudentsByExam: any[]|null;
  emailService: {
    status?: number
  };
  gradingService: {
    status?: number
  }
}

const initialState: TutorState = {
  status: 'idle',
  totalStudentsByCourse: null,
  myStudentsList: null,
  myCourseList: null,
  examsRecords: null,
  totalStudentsByExam: null,
  emailService: {},
  gradingService: {}
};

export const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAvailableTotalStudentsByCourse: (state, action: PayloadAction<TutorState['totalStudentsByCourse']>) => {
      state.status = 'loading';
      state.totalStudentsByCourse = action.payload;
      state.status = 'idle';
    },
    clearAvailableTotalStudentsByCourse: (state) => {
      state.status = 'loading';
      state.totalStudentsByCourse = null;
      state.status = 'idle';
    },
    setAvailableStudentsList: (state, action: PayloadAction<TutorState['myStudentsList']>) => {
      state.status = 'loading';
      state.myStudentsList = action.payload;
      state.status = 'idle';
    },
    clearAvailableStudentsList: (state) => {
      state.status = 'loading';
      state.myStudentsList = null;
      state.status = 'idle';
    },
    setAvailableCourseList: (state, action: PayloadAction<TutorState['myCourseList']>) => {
      state.status = 'loading';
      state.myCourseList = action.payload;
      state.status = 'idle';
    },
    clearAvailableCourseList: (state) => {
      state.status = 'loading';
      state.myCourseList = null;
      state.status = 'idle';
    },
    setAvailableExamsRecords: (state, action: PayloadAction<TutorState['examsRecords']>) => {
      state.status = 'loading';
      state.examsRecords = action.payload;
      state.status = 'idle';
    },
    clearAvailableExamsRecords: (state) => {
      state.status = 'loading';
      state.examsRecords = null;
      state.status = 'idle';
    },
    setTotalAvailableStudentsByExam: (state, action: PayloadAction<TutorState['totalStudentsByExam']>) => {
      state.status = 'loading';
      state.totalStudentsByExam = action.payload;
      state.status = 'idle';
    },
    clearTotalAvailableStudentsByExam: (state) => {
      state.status = 'loading';
      state.totalStudentsByExam = null;
      state.status = 'idle';
    },
    setMyEmailService: (state, action: PayloadAction<TutorState['emailService']>) => {
      state.status = 'loading';
      state.emailService = action.payload;
      state.status = 'idle';
    },
    clearMyEmailService: (state) => {
      state.status = 'loading';
      state.emailService = {};
      state.status = 'idle';
    },
    setMyGradingService: (state, action: PayloadAction<TutorState['gradingService']>) => {
      state.status = 'loading';
      state.gradingService = action.payload;
      state.status = 'idle';
    },
    clearMyGradingService: (state) => {
      state.status = 'loading';
      state.gradingService = {};
      state.status = 'idle';
    }
  }
});

export const {
    setAvailableTotalStudentsByCourse,
    clearAvailableTotalStudentsByCourse,
    setAvailableStudentsList,
    clearAvailableStudentsList,
    setAvailableExamsRecords,
    clearAvailableExamsRecords,
    setTotalAvailableStudentsByExam,
    clearTotalAvailableStudentsByExam,
    setMyEmailService,
    clearMyEmailService,
    setMyGradingService,
    clearMyGradingService,
    setAvailableCourseList,
    clearAvailableCourseList
} = tutorSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.tutor.value)`
export const selectTotalStudentsByCourse = (state: RootState) => state.tutor.totalStudentsByCourse;
export const selectMyStudentsList = (state: RootState) => state.tutor.myStudentsList;
export const selectExamsRecords = (state: RootState) => state.tutor.examsRecords;
export const selectTotalStudentsByExam = (state: RootState) => state.tutor.totalStudentsByExam;
export const selectEmailService = (state: RootState) => state.tutor.emailService;
export const selectGradingService = (state: RootState) => state.tutor.gradingService;
export const selectMyCourseList = (state: RootState) => state.tutor.myCourseList;
export const selectTutorDataStatus = (state: RootState) => state.tutor.status;

export default tutorSlice.reducer;