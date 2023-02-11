import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import WelcomePage from './features/welcome/WelcomePage'
import './App.css';
import Login from './features/login/Login';
import Profile from './features/user/Profile';
import Logout from './features/logout/Logout';
import NavBar from './features/nav/NavBar';
import AllCourses from './features/student/Courses';
import MyCourses from './features/student/Registered';
import SideNav from './features/nav/SideNav';
import { Container, Row, Col } from "react-bootstrap";
import Header from './features/user/PageHeader';
import ExamsGrades from './features/student/ExamsGrades';
import { useAppSelector } from '../src/app/hooks'
import { selectValue } from './features/login/loginSlice';
import StudentList from './features/tutor/MyStudentList';
import ExamsGradesFromTutor from './features/tutor/ExamsGrades';
import AdminStudentList from './features/admin/StudentList';
import AdminTutorList from './features/admin/TutorList';
import AdminCourseList from './features/admin/CourseList'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<string|null>()
  const loggedIn = localStorage.getItem("userTitle");
  const loggedInTitle = loggedIn && JSON.parse(loggedIn);
  const user = useAppSelector(selectValue)

  useEffect(() => {
    setIsLoggedIn(loggedInTitle)
  }, [loggedInTitle, user, isLoggedIn])

  return (
    <BrowserRouter>
      <Container fluid style={{maxWidth: "100vw", overflowX: "hidden", maxHeight: "100vh", overflowY: "hidden"}} className="p-0">
      <Row>
        <Col><NavBar /></Col>
      </Row>
      <Row>
        {isLoggedIn && <Col sm={2} className="border p-0 side-nav-container"><SideNav/></Col>}
        <Col sm={isLoggedIn ? 10 : 12}>
          {isLoggedIn && <Row>
            <Col><Header/></Col>
          </Row>}
          
          <Row>
            <Col style={{backgroundColor: "#f8f9fa"}} className="border-top">
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<Login />} />
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
              </Routes>
            </Col>
          </Row>
        </Col>
      </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
