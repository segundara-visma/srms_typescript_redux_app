import DataService from "../services/student.service";
import { useAppDispatch } from '../app/hooks';
import { setTotalAvailableCourses,
    clearAvailableCourseDetails,
    clearTotalAvailableCourses,
    setAvailableCourseDetails,
    setAvailableCourseList,
    clearAvailableCourseList,
    setTotalAvailableRegisteredCourses,
    clearTotalAvailableRegisteredCourses,
    setTotalAvailableExams,
    clearTotalAvailableExams,
    setAvailableExamsDetails,
    clearAvailableExamsDetails,
    clearPDFDownload,
    setPDFDownload,
    setRegisterStatusCode,
    clearRegisterStatusCode
} from "../features/student/studentSlice";
import { setErrorMessage } from "../features/user/userSlice";

export const setTotalCourses = () => (dispatch = useAppDispatch()) => {
    return DataService.getTotalCourses().then(
        (data) => {
            dispatch(setTotalAvailableCourses(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const clearTotalCourses = () => (dispatch = useAppDispatch()) => {
    dispatch(clearTotalAvailableCourses())
};

export const setCoursesDetails = (currentPage: number, perPage: number) => (dispatch = useAppDispatch()) => {
    return DataService.getCoursesDetails(currentPage, perPage).then(
        (data) => {
            dispatch(setAvailableCourseDetails(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const clearCoursesDetails = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableCourseDetails())
};

export const setTotalRegisteredCourses = (userID: string) => (dispatch = useAppDispatch()) => {
    return DataService.getTotalRegisteredCourses(userID).then(
        (data) => {
            dispatch(setTotalAvailableRegisteredCourses(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const clearTotalRegisteredCourses = () => (dispatch = useAppDispatch()) => {
    dispatch(clearTotalAvailableRegisteredCourses())
};

export const setMyCourseList = (currentPage: number, perPage: number, userID: string) => (dispatch = useAppDispatch()) => {
    return DataService.getMyCourseList(currentPage, perPage, userID).then(
        (data) => {
            dispatch(setAvailableCourseList(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const clearMyCourseList = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableCourseList())
};

export const setTotalExams = (userID: string) => (dispatch = useAppDispatch()) => {
    return DataService.getTotalExams(userID).then(
        (data) => {
            dispatch(setTotalAvailableExams(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const clearTotalExams = () => (dispatch = useAppDispatch()) => {
    dispatch(clearTotalAvailableExams())
};

export const setExamsDetails = (currentPage: number, perPage: number, userID: string) => (dispatch = useAppDispatch()) => {
    return DataService.getExamsDetails(currentPage, perPage, userID).then(
        (data) => {
            dispatch(setAvailableExamsDetails(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const clearExamsDetails = () => (dispatch = useAppDispatch()) => {
    dispatch(clearAvailableExamsDetails())
};

export const resgisterForCourse = (courseInfo: {}) => (dispatch = useAppDispatch()) => {
    return DataService.registerForCourse(courseInfo).then(
        (data) => {
            dispatch(setRegisterStatusCode(data.status))
            console.log(data.status)

            return Promise.resolve();
        },
        (error) => {
            // const message =
            //     (error.response &&
            //         error.response.data &&
            //         error.response.data.message) ||
            //     error.message ||
            //     error.toString();

            dispatch(setErrorMessage(error.response.data))
            dispatch(setRegisterStatusCode(error.response.status))

            return Promise.reject();
        }
    );
};

export const resetResgisterForCourse = () => (dispatch = useAppDispatch()) => {
    dispatch(clearRegisterStatusCode())
};

export const downloadPDF = (userID: string) => (dispatch = useAppDispatch()) => {
    return DataService.downloadPDF(userID).then(
        (data) => {
            dispatch(setPDFDownload(data));

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const clearDownloadPDF = () => (dispatch = useAppDispatch()) => {
    dispatch(clearPDFDownload())
};