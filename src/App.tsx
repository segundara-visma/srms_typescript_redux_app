import React from 'react';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import WelcomePage from './features/welcome/WelcomePage'
import './App.css';
import Login from './features/login/Login';
import Profile from './features/user/Profile';
import Logout from './features/logout/Logout';
import NavBar from './features/nav/NavBar';
import AllCourses from './features/student/Courses';
import MyCourses from './features/student/Registered';
import ExamsGrades from './features/student/ExamsGrades';
import StudentList from './features/tutor/MyStudentList';
import ExamsGradesFromTutor from './features/tutor/ExamsGrades';
import AdminStudentList from './features/admin/StudentList';
import AdminTutorList from './features/admin/TutorList';
import AdminCourseList from './features/admin/CourseList'
import ProtectedRoute from './features/login/ProtectedRoute';

function App() {
  const loggedIn = localStorage.getItem("userTitle")

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute isAuthenticated={!!loggedIn}/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/exams" element={<ExamsGrades />} />
          <Route path="/my-students" element={<StudentList />} />
          <Route path="/exams-grades" element={<ExamsGradesFromTutor />} />
          <Route path="/students-list" element={<AdminStudentList />} />
          <Route path="/tutors-list" element={<AdminTutorList />} />
          <Route path="/course-list" element={<AdminCourseList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
