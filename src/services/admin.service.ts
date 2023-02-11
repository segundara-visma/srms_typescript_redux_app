import axios from "axios";
import authAxios from "../lib/http"
import Cookies from "js-cookie"
import { AdminState } from "../features/admin/adminSlice";

const getTotalStudents = async () => {
    const res = await authAxios.get(`/student`, { withCredentials: true });
    let students = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/student`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        students = secondRes.data;
    } else {
        students = res.data;
    }
    return students.count
};

const getStudentsDetails = async (currentPage: number, perPage: number) => {
    const skip = currentPage * perPage - perPage;
    const res = await authAxios.get(
        `/student?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
    );
    let allStudents = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/student?limit=${perPage}&offset=${skip}`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allStudents = secondRes.data;
    } else {
        allStudents = res.data;
    }
    return allStudents.data;
};

const getDepartmentsDetails = async () => {
    const response = await authAxios.get(`/departments`, {
        withCredentials: true,
    });
    let allDepartments = [];

    if (!response) {
        const secondResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/departments`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allDepartments = secondResponse.data;
    } else {
        allDepartments = response.data;
    }
    return allDepartments.data;
};

const getNewStudent = async (data: {}) => {
    const res = await authAxios.post(`/student/register`, data, {
        withCredentials: true,
    });
    // let response = [];
    let result: AdminState['newStudent'];

    if (!res) {
        const secondRes = await axios.post(
            `${process.env.REACT_APP_API_URL}/student/register`,
            data,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        // response = await secondRes;
        result = { status: secondRes.status }
    } else {
        // response = await res;
        result = { status: res.status }
    }
    console.log(result)
    return result
};

const getTotalTutors = async () => {
    const res = await authAxios.get(`/tutor`, { withCredentials: true });
    let tutors = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/tutor`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        tutors = secondRes.data;
    } else {
        tutors = res.data;
    }
    return tutors.count
};

const getTutorsDetails = async (currentPage: number, perPage: number) => {
    const skip = currentPage * perPage - perPage;
    const res = await authAxios.get(
        `/tutor?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
    );
    let allTutors = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/tutor?limit=${perPage}&offset=${skip}`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allTutors = secondRes.data;
    } else {
        allTutors = res.data;
    }
    return allTutors.data;
};

const getNewTutor = async (data: {}) => {
    const res = await authAxios.post(`/tutor/register`, data, {
        withCredentials: true,
    });
    // let response = [];
    let result: AdminState['newTutor'];

    if (!res) {
        const secondRes = await axios.post(
            `${process.env.REACT_APP_API_URL}/tutor/register`,
            data,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        // response = await secondRes;
        result = {status: secondRes.status}
    } else {
        // response = await res;
        result = {status: res.status}
    }
    console.log(result)
    return result
};

const getTotalCourses = async () => {
    const res = await authAxios.get(`/courses`, { withCredentials: true });
    let courses = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/courses`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        courses = secondRes.data;
    } else {
        courses = res.data;
    }
    return courses.count
};

const getCoursesDetails = async (currentPage: number, perPage: number) => {
    const skip = currentPage * perPage - perPage;
    const res = await authAxios.get(
        `/courses?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
    );
    let allCourses = [];

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/courses?limit=${perPage}&offset=${skip}`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allCourses = secondRes.data;
    } else {
        allCourses = res.data;
    }
    return allCourses.data;
};

const getNewCourse = async (data: {}) => {
    const res = await authAxios.post(`/courses`, data, {
        withCredentials: true,
    });
    // let response = [];
    let result: AdminState['newCourse'];

    if (!res) {
        const secondRes = await axios.post(
            `${process.env.REACT_APP_API_URL}/courses`,
            data,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        // response = await secondRes;
        result = {status: secondRes.status}
    } else {
        // response = await res;
        result = {status: res.status}
    }
    console.log(result)
    return result
};

const getTutors = async () => {
    const response = await authAxios.get(`/tutor`, { withCredentials: true });
    let allTutors = [];

    if (!response) {
        const secondResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/tutor`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                withCredentials: true,
            }
        );
        allTutors = secondResponse.data;
    } else {
        allTutors = response.data;
    }

    return allTutors.data
};

const adminServiceObjects = {
    getTotalStudents,
    getStudentsDetails,
    getDepartmentsDetails,
    getNewStudent,
    getTotalTutors,
    getTutorsDetails,
    getNewTutor,
    getTotalCourses,
    getCoursesDetails,
    getNewCourse,
    getTutors
};

export default adminServiceObjects;