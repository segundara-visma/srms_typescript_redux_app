import React, { useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';

import { logout } from "../../actions/auth";
// import { clearMessage } from "../../actions/message";
// import { clearMe } from "../../actions/fetch_Me";
// import {
//     clearCoursesDetails,
//     clearMyCourseList,
//     clearTotalCourses,
//     clearTotalRegisteredCourses,
//     resetResgisterForCourse,
//     clearTotalExams,
//     clearExamsDetails,
//     clearDownloadPDF
// } from "../../actions/studentData";
// import {
//     clearTotalStudentsByExam,
//     clearTotalStudentsByCourse,
//     clearEmailService,
//     clearExamsRecords,
//     clearGradingService,
//     clearMyStudentsList
// } from "../../actions/tutorData";
// import {
//     clearTotalStudents,
//     clearTutorsDetails,
//     clearNewStudent,
//     clearTotalTutors,
//     clearTutors,
//     clearNewTutor,
//     clearNewCourse,
//     clearDepartmentsDetails,
//     clearStudentsDetails
// } from "../../actions/adminData";

const Logout = () => {

    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    useEffect(() => {

        const logOut = () => {
            localStorage.clear();
            dispatch(logout());
            // dispatch(clearMe());
            // dispatch(clearMessage());
            // dispatch(clearTotalCourses());
            // dispatch(clearTotalRegisteredCourses());
            // dispatch(clearCoursesDetails());
            // dispatch(clearMyCourseList());
            // dispatch(clearDownloadPDF());
            // dispatch(resetResgisterForCourse());
            // dispatch(clearTotalExams());
            // dispatch(clearExamsDetails());

            // dispatch(clearTotalStudentsByExam());
            // dispatch(clearTotalStudentsByCourse());
            // dispatch(clearEmailService());
            // dispatch(clearExamsRecords());
            // dispatch(clearGradingService());
            // dispatch(clearMyStudentsList());

            // dispatch(clearTotalStudents());
            // dispatch(clearTutorsDetails());
            // dispatch(clearNewStudent());
            // dispatch(clearTotalTutors());
            // dispatch(clearTutors());
            // dispatch(clearNewTutor());
            // dispatch(clearNewCourse());
            // dispatch(clearDepartmentsDetails());
            // dispatch(clearStudentsDetails());

            navigate('/');
        };

        logOut()
    }, [dispatch, navigate])

    return (
        <div className="text-center qoute">
            You already logged out. Please <a href="/login">Login</a> again to continue.
        </div>
    );
}

export default Logout