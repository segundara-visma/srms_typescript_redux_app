import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AdminState {
  status: 'idle' | 'loading' | 'failed';
  departmentsDetails: any[]|null;
  studentsDetails: any[]|null;
  totalStudents: number|null;
  totalTutors: number|null;
  tutorsDetails: any[]|null;
  newStudent: {
    status?: number
  };
  newTutor: {
    status?: number
  };
  newCourse: {
    status?: number
  };
  coursesDetails: any[]|null;
  totalCourses: number|null;
  tutors: any[]|null
}

const initialState: AdminState = {
  status: 'idle',
  departmentsDetails: null,
  studentsDetails: null,
  totalStudents: null,
  totalTutors: null,
  tutorsDetails: null,
  newStudent: {},
  newTutor: {},
  newCourse: {},
  coursesDetails: null,
  totalCourses: null,
  tutors: null
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAvailableTotalStudents: (state, action: PayloadAction<AdminState['totalStudents']>) => {
      state.status = 'loading';
      state.totalStudents = action.payload;
      state.status = 'idle';
    },
    clearAvailableTotalStudents: (state) => {
      state.status = 'loading';
      state.totalStudents = null;
      state.status = 'idle';
    },
    setAvailableTotalTutors: (state, action: PayloadAction<AdminState['totalTutors']>) => {
      state.status = 'loading';
      state.totalTutors = action.payload;
      state.status = 'idle';
    },
    clearAvailableTotalTutors: (state) => {
      state.status = 'loading';
      state.totalTutors = null;
      state.status = 'idle';
    },
    setAvailableTotalCourses: (state, action: PayloadAction<AdminState['totalCourses']>) => {
      state.status = 'loading';
      state.totalCourses = action.payload;
      state.status = 'idle';
    },
    clearAvailableTotalCourses: (state) => {
      state.status = 'loading';
      state.totalCourses = null;
      state.status = 'idle';
    },
    setTotalAvailableDepartmentsDetails: (state, action: PayloadAction<AdminState['departmentsDetails']>) => {
      state.status = 'loading';
      state.departmentsDetails = action.payload;
      state.status = 'idle';
    },
    clearTotalAvailableDepartmentsDetails: (state) => {
      state.status = 'loading';
      state.departmentsDetails = null;
      state.status = 'idle';
    },
    setTotalAvailableStudentsDetails: (state, action: PayloadAction<AdminState['studentsDetails']>) => {
      state.status = 'loading';
      state.studentsDetails = action.payload;
      state.status = 'idle';
    },
    clearTotalAvailableStudentsDetails: (state) => {
      state.status = 'loading';
      state.studentsDetails = null;
      state.status = 'idle';
    },
    setTotalAvailableTutorsDetails: (state, action: PayloadAction<AdminState['tutorsDetails']>) => {
      state.status = 'loading';
      state.tutorsDetails = action.payload;
      state.status = 'idle';
    },
    clearTotalAvailableTutorsDetails: (state) => {
      state.status = 'loading';
      state.tutorsDetails = null;
      state.status = 'idle';
    },
    setTotalAvailableCoursesDetails: (state, action: PayloadAction<AdminState['coursesDetails']>) => {
      state.status = 'loading';
      state.coursesDetails = action.payload;
      state.status = 'idle';
    },
    clearTotalAvailableCoursesDetails: (state) => {
      state.status = 'loading';
      state.coursesDetails = null;
      state.status = 'idle';
    },
    setAvailableNewTutor: (state, action: PayloadAction<AdminState['newTutor']>) => {
      state.status = 'loading';
      state.newTutor = action.payload;
      state.status = 'idle';
    },
    clearAvailableNewTutor: (state) => {
      state.status = 'loading';
      state.newTutor = {};
      state.status = 'idle';
    },
    setAvailableNewCourse: (state, action: PayloadAction<AdminState['newCourse']>) => {
      state.status = 'loading';
      state.newCourse = action.payload;
      state.status = 'idle';
    },
    clearAvailableNewCourse: (state) => {
      state.status = 'loading';
      state.newCourse = {};
      state.status = 'idle';
    },
    setAvailableNewStudent: (state, action: PayloadAction<AdminState['newStudent']>) => {
      state.status = 'loading';
      state.newStudent = action.payload;
      state.status = 'idle';
    },
    clearAvailableNewStudent: (state) => {
      state.status = 'loading';
      state.newStudent = {};
      state.status = 'idle';
    },
    setAvailableTutors: (state, action: PayloadAction<AdminState['tutors']>) => {
      state.status = 'loading';
      state.tutors = action.payload;
      state.status = 'idle';
    },
    clearAvailableTutors: (state) => {
      state.status = 'loading';
      state.tutors = null;
      state.status = 'idle';
    }
  }
});

export const {
    setAvailableTotalStudents,
    clearAvailableTotalStudents,
    setAvailableTotalTutors,
    clearAvailableTotalTutors,
    setAvailableTotalCourses,
    clearAvailableTotalCourses,
    setTotalAvailableDepartmentsDetails,
    clearTotalAvailableDepartmentsDetails,
    setTotalAvailableStudentsDetails,
    clearTotalAvailableStudentsDetails,
    setTotalAvailableTutorsDetails,
    clearTotalAvailableTutorsDetails,
    setTotalAvailableCoursesDetails,
    clearTotalAvailableCoursesDetails,
    setAvailableNewTutor,
    clearAvailableNewTutor,
    setAvailableNewCourse,
    clearAvailableNewCourse,
    setAvailableNewStudent,
    clearAvailableNewStudent,
    setAvailableTutors,
    clearAvailableTutors
} = adminSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.admin.value)`
export const selectDepartmentsDetails = (state: RootState) => state.admin.departmentsDetails;
export const selectStudentsDetails = (state: RootState) => state.admin.studentsDetails;
export const selectCoursesDetails = (state: RootState) => state.admin.coursesDetails;
export const selectTutorsDetails = (state: RootState) => state.admin.tutorsDetails;
export const selectTotalStudents = (state: RootState) => state.admin.totalStudents;
export const selectTotalTutors = (state: RootState) => state.admin.totalTutors;
export const selectTotalCourses = (state: RootState) => state.admin.totalCourses;
export const selectNewStudent = (state: RootState) => state.admin.newStudent;
export const selectNewTutor = (state: RootState) => state.admin.newTutor;
export const selectNewCourse = (state: RootState) => state.admin.newCourse;
export const selectTutors = (state: RootState) => state.admin.tutors;
export const selectAdminDataStatus = (state: RootState) => state.admin.status;

export default adminSlice.reducer;