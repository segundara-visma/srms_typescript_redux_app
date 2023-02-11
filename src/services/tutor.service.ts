import axios from "axios";
import authAxios from "../lib/http"
import Cookies from "js-cookie"
import { TutorState } from "../features/tutor/tutorSlice";

const getTutorCourses = (userID: string) => {
    return authAxios.get(`/courses/${userID}`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${process.env.REACT_APP_API_URL}/courses/${userID}`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data;
                    });
            }
            return response.data;
        });
};

const getTotalStudentsByCourse = async (userID: string) => {
    const courses = await getTutorCourses(userID);
    let totalStudent = [];
    if (courses) {
        for (const course of courses) {
            let student = [];

            const res = await authAxios.get(
                `/register/student_list/${course._id}`,
                { withCredentials: true }
            );

            if (!res) {
                const secondRes = await axios.get(
                    `${process.env.REACT_APP_API_URL}/register/student_list/${course._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                        withCredentials: true,
                    }
                );
                student = secondRes.data;
            } else {
                student = res.data;
            }
            totalStudent.push(student.count);
        }
    }
    return {
        totalStudent,
        courseList: courses
    };
};

const getMyStudentsList = async (currentPage: number, perPage: number, userID: string, courseID: string) => {
    const courses = await getTutorCourses(userID);
    let allStudents = [];
    const skip = currentPage * perPage - perPage;

    if (courses && !courseID) {
        courseID = courses[0]._id
    }

    const res = await authAxios.get(
        `/register/student_list/${courseID}?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
    );

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/register/student_list/${courseID}?limit=${perPage}&offset=${skip}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                withCredentials: true,
            }
        );
        allStudents = secondRes.data.data;
    } else {
        allStudents = res.data.data;
    }

    // if (courses) {
    //     let student = [];
    //     let eachList = {
    //         name: null,
    //         students: null
    //     };
    //     // eachList.name = courses[courseID].name;
    //     // eachList.students = student.data;
    //     // allStudents.push(eachList);

    //     // for (const course of courses) {
    //     //     let student = [];
    //     //     let eachList = {
    //     //         name: null,
    //     //         students: null
    //     //     };

    //     //     const skip = currentPage * perPage - perPage;
    //     //     const res = await authAxios.get(
    //     //         `/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
    //     //         { withCredentials: true }
    //     //     );

    //     //     if (!res) {
    //     //         const secondRes = await axios.get(
    //     //             `${process.env.REACT_APP_API_URL}/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
    //     //             {
    //     //                 headers: {
    //     //                     Authorization: `Bearer ${Cookies.get("accessToken")}`,
    //     //                 },
    //     //                 withCredentials: true,
    //     //             }
    //     //         );
    //     //         student = secondRes.data;
    //     //     } else {
    //     //         student = res.data;
    //     //     }
    //     //     eachList.name = course.name;
    //     //     eachList.students = student.data;
    //     //     allStudents.push(eachList);
    //     // }
    // }
    return allStudents;
};

const getExamsRecords = async (currentPage: number, perPage: number, userID: string, courseID: string) => {
    const courses = await getTutorCourses(userID);
    let allStudents = [];
    const skip = currentPage * perPage - perPage;

    if (courses && !courseID) {
        courseID = courses[0]._id
    }

    const res = await authAxios.get(
        `/exams/student_list/${courseID}?limit=${perPage}&offset=${skip}`,
        { withCredentials: true }
    );

    if (!res) {
        const secondRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/exams/student_list/${courseID}?limit=${perPage}&offset=${skip}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                withCredentials: true,
            }
        );
        allStudents = secondRes.data.data;
    } else {
        allStudents = res.data.data;
    }

    // if (courses) {
    //     for (const course of courses) {
    //         let student = [];
    //         let eachRecord = {
    //             name: null,
    //             students: null
    //         };
    //         const skip = currentPage * perPage - perPage;
    //         const res = await authAxios.get(
    //             `/exams/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
    //             { withCredentials: true }
    //         );

    //         if (!res) {
    //             const secondRes = await axios.get(
    //                 `${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("accessToken")}`,
    //                     },
    //                     withCredentials: true,
    //                 }
    //             );
    //             student = secondRes.data;
    //         } else {
    //             student = res.data;
    //         }
    //         eachRecord.name = course.name;
    //         eachRecord.students = student.data;
    //         allStudents.push(eachRecord);
    //     }
    // }
    return allStudents;
};

const getTotalStudentsByExam = async (userID: string) => {
    const courses = await getTutorCourses(userID);
    let totalStudent = [];
    if (courses) {
        for (const course of courses) {
            let student = [];

            const res = await authAxios.get(
                `/exams/student_list/${course._id}`,
                { withCredentials: true }
            );

            if (!res) {
                const secondRes = await axios.get(
                    `${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                        withCredentials: true,
                    }
                );
                student = secondRes.data;
            } else {
                student = res.data;
            }
            totalStudent.push(student.count);
        }
    }
    return {
        totalStudent,
        courseList: courses
    };
};

const getEmailService = (data: {}) => {
    const url_1 = `/tutor/email/ToStudent`;
    const url_2 = `${process.env.REACT_APP_API_URL}/tutor/email/ToStudent`;
    let result: TutorState['emailService'];
    return authAxios.post(`${url_1}`, data, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.post(`${url_2}`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        result = {status: response.status}
                        return result;
                    });
            }
            result = {status: response.status}
            return result;
        });
};

const getGradingService = (data: {}, studentId: string, examId: string) => {
    const url_1 = `/exams/${studentId}/${examId}`;
    const url_2 = `${process.env.REACT_APP_API_URL}/exams/${studentId}/${examId}`;
    let result: TutorState['gradingService'];
    return authAxios.put(`${url_1}`, data, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.put(`${url_2}`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        result = {status: response.status}
                        return result;
                    });
            }
            result = {status: response.status}
            return result;
        });
};

const tutorServiceObjects = {
    getTutorCourses,
    getTotalStudentsByCourse,
    getMyStudentsList,
    getExamsRecords,
    getTotalStudentsByExam,
    getEmailService,
    getGradingService
}

export default tutorServiceObjects;