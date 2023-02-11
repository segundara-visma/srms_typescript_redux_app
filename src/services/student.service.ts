import axios from "axios";
import authAxios from "../lib/http"
import Cookies from "js-cookie"
import { StudentState } from "../features/student/studentSlice";

const getTotalCourses = () => {
    return authAxios.get(`/courses`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data.count;
                    });
            }
            return response.data.count;
        });
};

const getCoursesDetails = (currentPage: number, perPage: number) => {
    const skip = currentPage * perPage - perPage;
    const url_1 = `/courses?limit=${perPage}&offset=${skip}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/courses?limit=${perPage}&offset=${skip}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data.data;
                    });
            }
            return response.data.data;
        });
};

const getTotalRegisteredCourses = (userID: string) => {
    const url_1 = `/register/course_list/${userID}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/register/course_list/${userID}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data.count;
                    });
            }
            return response.data.count;
        });
};

const getMyCourseList = (currentPage: number, perPage: number, userID: string) => {
    const skip = currentPage * perPage - perPage;
    const url_1 = `/register/course_list/${userID}?limit=${perPage}&offset=${skip}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/register/course_list/${userID}?limit=${perPage}&offset=${skip}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data.data;
                    });
            }
            return response.data.data;
        });
};

const getTotalExams = (userID: string) => {
    const url_1 = `/exams/${userID}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/exams/${userID}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data.count;
                    });
            }
            return response.data.count;
        });
};

const getExamsDetails = (currentPage: number, perPage: number, userID: string) => {
    const skip = currentPage * perPage - perPage;
    const url_1 = `/exams/${userID}?limit=${perPage}&offset=${skip}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/exams/${userID}?limit=${perPage}&offset=${skip}`;
    return authAxios.get(`${url_1}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${url_2}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data.data;
                    });
            }
            return response.data.data;
        });
};

const registerForCourse = (data: {}) => {
    const url_1 = `/register`;
    const url_2 = `${process.env.REACT_APP_API_URL}/register`;
    return authAxios.post(`${url_1}`, data, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.post(`${url_2}`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response;
                    });
            }
            return response;
        });
};

const downloadPDF = async (userID: string) => {
    const res = await authAxios.get(`/exams/${userID}/pdf`, {
        responseType: "blob",
        withCredentials: true,
    });
    let result: StudentState['pdfData'];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/exams/${userID}/pdf`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                responseType: "blob",
                withCredentials: true,
            }
        );
        result = {data: secondRes.data, headers: JSON.parse(JSON.stringify(secondRes.headers))}
        return result;
    } else {
        result = {data: res.data, headers: JSON.parse(JSON.stringify(res.headers))}
        return result;
    }
};

const studentServiceObjects = {
    getTotalCourses,
    getCoursesDetails,
    getTotalRegisteredCourses,
    getMyCourseList,
    getTotalExams,
    getExamsDetails,
    registerForCourse,
    downloadPDF
}

export default studentServiceObjects;