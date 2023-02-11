import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface StudentState {
  status: 'idle' | 'loading' | 'failed';
  totalCourses: number|null;
  courseDetails: any[]|null;
  totalRegisteredCourses: number|null;
  courseList: any[]|null;
  totalExams: number|null;
  examsDetails: any[]|null;
  pdfData: {
    headers?: any,
    data?: string
  };
  courseRegisterStatusCode: number|null;
}

const initialState: StudentState = {
  status: 'idle',
  totalCourses: null,
  courseDetails: null,
  totalRegisteredCourses: null,
  courseList: null,
  totalExams: null,
  examsDetails: null,
  pdfData: {},
  courseRegisterStatusCode: null
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTotalAvailableCourses: (state, action: PayloadAction<StudentState['totalCourses']>) => {
      state.status = 'loading';
      state.totalCourses = action.payload;
      state.status = 'idle';
    },
    clearTotalAvailableCourses: (state) => {
      state.status = 'loading';
      state.totalCourses = null;
      state.status = 'idle';
    },
    setAvailableCourseDetails: (state, action: PayloadAction<StudentState['courseDetails']>) => {
      state.status = 'loading';
      state.courseDetails = action.payload;
      state.status = 'idle';
    },
    clearAvailableCourseDetails: (state) => {
      state.status = 'loading';
      state.courseDetails = null;
      state.status = 'idle';
    },
    setTotalAvailableRegisteredCourses: (state, action: PayloadAction<StudentState['totalRegisteredCourses']>) => {
      state.status = 'loading';
      state.totalRegisteredCourses = action.payload;
      state.status = 'idle';
    },
    clearTotalAvailableRegisteredCourses: (state) => {
      state.status = 'loading';
      state.totalRegisteredCourses = null;
      state.status = 'idle';
    },
    setAvailableCourseList: (state, action: PayloadAction<StudentState['courseList']>) => {
      state.status = 'loading';
      state.courseList = action.payload;
      state.status = 'idle';
    },
    clearAvailableCourseList: (state) => {
      state.status = 'loading';
      state.courseList = null;
      state.status = 'idle';
    },
    setTotalAvailableExams: (state, action: PayloadAction<StudentState['totalExams']>) => {
      state.status = 'loading';
      state.totalExams = action.payload;
      state.status = 'idle';
    },
    clearTotalAvailableExams: (state) => {
      state.status = 'loading';
      state.totalExams = null;
      state.status = 'idle';
    },
    setAvailableExamsDetails: (state, action: PayloadAction<StudentState['examsDetails']>) => {
      state.status = 'loading';
      state.examsDetails = action.payload;
      state.status = 'idle';
    },
    clearAvailableExamsDetails: (state) => {
      state.status = 'loading';
      state.examsDetails = null;
      state.status = 'idle';
    },
    setPDFDownload: (state, action: PayloadAction<StudentState['pdfData']>) => {
      state.status = 'loading';
      state.pdfData = action.payload;
      state.status = 'idle';
    },
    clearPDFDownload: (state) => {
      state.status = 'loading';
      state.pdfData = {};
      state.status = 'idle';
    },
    setRegisterStatusCode: (state, action: PayloadAction<StudentState['courseRegisterStatusCode']>) => {
      state.status = 'loading';
      state.courseRegisterStatusCode = action.payload;
      state.status = 'idle';
    },
    clearRegisterStatusCode: (state) => {
      state.status = 'loading';
      state.courseRegisterStatusCode = null;
      state.status = 'idle';
    }
  }
});

export const {
    setTotalAvailableCourses,
    setTotalAvailableRegisteredCourses,
    setAvailableCourseDetails,
    setAvailableCourseList,
    setTotalAvailableExams,
    setAvailableExamsDetails,
    setRegisterStatusCode,
    clearTotalAvailableCourses,
    clearTotalAvailableRegisteredCourses,
    clearTotalAvailableExams,
    clearAvailableCourseDetails,
    clearAvailableExamsDetails,
    clearAvailableCourseList,
    setPDFDownload,
    clearPDFDownload,
    clearRegisterStatusCode
} = studentSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.student.value)`
export const selectCourseDeatils = (state: RootState) => state.student.courseDetails;
export const selectTotalCourses = (state: RootState) => state.student.totalCourses;
export const selectCourseList = (state: RootState) => state.student.courseList;
export const selectTotalRegisteredCourses = (state: RootState) => state.student.totalRegisteredCourses;
export const selectExamsDeatils = (state: RootState) => state.student.examsDetails;
export const selectTotalExams = (state: RootState) => state.student.totalExams;
export const selectPDFRecord = (state: RootState) => state.student.pdfData;
export const selectRegisterStatusCode = (state: RootState) => state.student.courseRegisterStatusCode;
export const selectStudentDataStatus = (state: RootState) => state.student.status;

export default studentSlice.reducer;