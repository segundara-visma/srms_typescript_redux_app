import DataService from "../services/admin.service";
import { useAppDispatch } from '../app/hooks';
import { clearAvailableNewCourse,
    clearAvailableNewStudent,
    clearAvailableNewTutor,
    clearAvailableTotalCourses,
    clearAvailableTotalStudents,
    clearAvailableTotalTutors,
    clearAvailableTutors,
    clearTotalAvailableCoursesDetails,
    clearTotalAvailableDepartmentsDetails,
    clearTotalAvailableStudentsDetails,
    clearTotalAvailableTutorsDetails,
    setAvailableNewCourse,
    setAvailableNewStudent,
    setAvailableNewTutor,
    setAvailableTotalCourses,
    setAvailableTotalStudents,
    setAvailableTotalTutors,
    setAvailableTutors,
    setTotalAvailableCoursesDetails,
    setTotalAvailableDepartmentsDetails,
    setTotalAvailableStudentsDetails,
    setTotalAvailableTutorsDetails
} from "../features/admin/adminSlice";
import { setErrorMessage } from "../features/user/userSlice";

export const setTotalStudents = () => (dispatch = useAppDispatch()) => {
    return DataService.getTotalStudents().then(
        (data) => {
            dispatch(setAvailableTotalStudents(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearTotalStudents = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableTotalStudents())
};

export const setStudentsDetails = (currentPage: number, perPage: number) => (dispatch = useAppDispatch()) => {
    return DataService.getStudentsDetails(currentPage, perPage).then(
        (data) => {
            dispatch(setTotalAvailableStudentsDetails(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearStudentsDetails = () => (dispatch = useAppDispatch()) => {
    dispatch(clearTotalAvailableStudentsDetails())
};

export const setDepartmentsDetails = () => (dispatch = useAppDispatch()) => {
    return DataService.getDepartmentsDetails().then(
        (data) => {
            dispatch(setTotalAvailableDepartmentsDetails(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearDepartmentsDetails = () => (dispatch = useAppDispatch()) => {
    dispatch(clearTotalAvailableDepartmentsDetails())
};

export const setNewStudent = (data: {}) => (dispatch = useAppDispatch()) => {
    return DataService.getNewStudent(data).then(
        (data) => {
            dispatch(setAvailableNewStudent(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearNewStudent = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableNewStudent())
};

export const setTotalTutors = () => (dispatch = useAppDispatch()) => {
    return DataService.getTotalTutors().then(
        (data) => {
            dispatch(setAvailableTotalTutors(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearTotalTutors = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableTotalTutors())
};

export const setTutorsDetails = (currentPage: number, perPage: number) => (dispatch = useAppDispatch()) => {
    return DataService.getTutorsDetails(currentPage, perPage).then(
        (data) => {
            dispatch(setTotalAvailableTutorsDetails(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearTutorsDetails = () => (dispatch = useAppDispatch()) => {
    dispatch(clearTotalAvailableTutorsDetails())
};

export const setNewTutor = (data: {}) => (dispatch = useAppDispatch()) => {
    return DataService.getNewTutor(data).then(
        (data) => {
            dispatch(setAvailableNewTutor(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearNewTutor = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableNewTutor())
};

export const setTotalCourses = () => (dispatch = useAppDispatch()) => {
    return DataService.getTotalCourses().then(
        (data) => {
            dispatch(setAvailableTotalCourses(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearTotalCourses = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableTotalCourses())
};

export const setCoursesDetails = (currentPage: number, perPage: number) => (dispatch = useAppDispatch()) => {
    return DataService.getCoursesDetails(currentPage, perPage).then(
        (data) => {
            dispatch(setTotalAvailableCoursesDetails(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearCoursesDetails = () => (dispatch = useAppDispatch()) => {
    dispatch(clearTotalAvailableCoursesDetails())
};

export const setNewCourse = (data: {}) => (dispatch = useAppDispatch()) => {
    return DataService.getNewCourse(data).then(
        (data) => {
            dispatch(setAvailableNewCourse(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearNewCourse = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableNewCourse())
};

export const setTutors = () => (dispatch = useAppDispatch()) => {
    return DataService.getTutors().then(
        (data) => {
            dispatch(setAvailableTutors(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message));

            return Promise.reject();
        }
    );
};

export const clearTutors = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableTutors())
};