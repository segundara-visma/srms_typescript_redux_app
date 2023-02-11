import DataService from "../services/tutor.service";
import { useAppDispatch } from '../app/hooks';
import { clearAvailableCourseList,
    clearAvailableExamsRecords,
    clearAvailableStudentsList,
    clearAvailableTotalStudentsByCourse,
    clearMyEmailService,
    clearMyGradingService,
    clearTotalAvailableStudentsByExam,
    setAvailableCourseList,
    setAvailableExamsRecords,
    setAvailableStudentsList,
    setAvailableTotalStudentsByCourse,
    setMyEmailService,
    setMyGradingService,
    setTotalAvailableStudentsByExam
} from "../features/tutor/tutorSlice";
import { setErrorMessage } from "../features/user/userSlice";

export const setTotalStudentsByCourse = (userID: string) => (dispatch = useAppDispatch()) => {
    return DataService.getTotalStudentsByCourse(userID).then(
        (data) => {
            dispatch(setAvailableTotalStudentsByCourse(data.totalStudent));
            dispatch(setAvailableCourseList(data.courseList));

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

export const clearTotalStudentsByCourse = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableTotalStudentsByCourse())
};

export const setMyStudentsList = (currentPage: number, perPage: number, userID: string, courseID: string) => (dispatch = useAppDispatch()) => {
    return DataService.getMyStudentsList(currentPage, perPage, userID, courseID).then(
        (data) => {
            dispatch(setAvailableStudentsList(data));

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

export const clearMyStudentsList = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableStudentsList())
};

// export const setMyCourseList = (userID: string) => (dispatch = useAppDispatch()) => {
//     return DataService.getTutorCourses(userID).then(
//         (data) => {
//             dispatch(setAvailableCourseList(data));

//             return Promise.resolve();
//         },
//         (error) => {
//             const message =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();

//             dispatch(setErrorMessage(message));

//             return Promise.reject();
//         }
//     );
// };

export const clearMyCourseList = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableCourseList())
};

export const setExamsRecords = (currentPage: number, perPage: number, userID: string, courseID: string) => (dispatch = useAppDispatch()) => {
    return DataService.getExamsRecords(currentPage, perPage, userID, courseID).then(
        (data) => {
            dispatch(setAvailableExamsRecords(data));

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

export const clearExamsRecords = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableExamsRecords())
};

export const setTotalStudentsByExam = (userID: string) => (dispatch = useAppDispatch()) => {
    return DataService.getTotalStudentsByExam(userID).then(
        (data) => {
            dispatch(setTotalAvailableStudentsByExam(data.totalStudent));
            dispatch(setAvailableCourseList(data.courseList));

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

export const clearTotalStudentsByExam = () => (dispatch = useAppDispatch()) => {
    dispatch(clearTotalAvailableStudentsByExam())
};

export const setEmailService = (data: {}) => (dispatch = useAppDispatch()) => {
    return DataService.getEmailService(data).then(
        (data) => {
            dispatch(setMyEmailService(data));

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

export const clearEmailService = () => (dispatch = useAppDispatch()) => {
    dispatch(clearMyEmailService())
};

export const setGradingService = (data: {}, studentId: string, examId: string) => (dispatch = useAppDispatch()) => {
    return DataService.getGradingService(data, studentId, examId).then(
        (data) => {
            dispatch(setMyGradingService(data));

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

export const clearGradingService = () => (dispatch = useAppDispatch()) => {
    dispatch(clearMyGradingService())
};