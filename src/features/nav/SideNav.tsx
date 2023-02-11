import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';

function SideNav() {
  const location = useLocation();
  const title = localStorage.getItem("userTitle");
  const loggedInTitle = title && JSON.parse(title)
  return (
    <>
      {loggedInTitle === "student"
      && (
        <Nav className="flex-column mt-3" style={{fontSize: "1rem"}}>
          <Nav.Link style={location.pathname === '/courses' ? { backgroundColor: "hsla(242,88.4%,66.3%,1)", color: "#fff" } : {color: "hsla(242,88.4%,66.3%,1)"}} eventKey="student-link-1" href='/courses' className='link'>All Courses</Nav.Link>
          <Nav.Link style={location.pathname === '/my-courses' ? { backgroundColor: "hsla(242,88.4%,66.3%,1)", color: "#fff" } : {color: "hsla(242,88.4%,66.3%,1)"}} eventKey="student-link-2" href='/my-courses' className='link'>My Courses</Nav.Link>
          <Nav.Link style={location.pathname === '/exams' ? { backgroundColor: "hsla(242,88.4%,66.3%,1)", color: "#fff" } : {color: "hsla(242,88.4%,66.3%,1)"}} eventKey="student-link-3" href='/exams' className='link'>Exams</Nav.Link>
        </Nav>
      )}
      {loggedInTitle === "tutor"
      && (
        <Nav className="flex-column mt-3" style={{fontSize: "1rem"}}>
          <Nav.Link style={location.pathname === '/my-students' ? { backgroundColor: "hsla(242,88.4%,66.3%,1)", color: "#fff" } : {color: "hsla(242,88.4%,66.3%,1)"}} eventKey="tutor-link-1" href='/my-students' className='link'>Students</Nav.Link>
          <Nav.Link style={location.pathname === '/exams-grades' ? { backgroundColor: "hsla(242,88.4%,66.3%,1)", color: "#fff" } : {color: "hsla(242,88.4%,66.3%,1)"}} eventKey="tutor-link-2" href='/exams-grades' className='link'>Exams</Nav.Link>
        </Nav>
      )}
      {loggedInTitle === "admin"
      && (
        <Nav className="flex-column mt-3" style={{fontSize: "1rem"}}>
          <Nav.Link style={location.pathname === '/students-list' ? { backgroundColor: "hsla(242,88.4%,66.3%,1)", color: "#fff" } : {color: "hsla(242,88.4%,66.3%,1)"}} eventKey="admin-link-1" href='/students-list' className='link'>Students List</Nav.Link>
          <Nav.Link style={location.pathname === '/tutors-list' ? { backgroundColor: "hsla(242,88.4%,66.3%,1)", color: "#fff" } : {color: "hsla(242,88.4%,66.3%,1)"}} eventKey="admin-link-2" href='/tutors-list' className='link'>Tutors List</Nav.Link>
          <Nav.Link style={location.pathname === '/course-list' ? { backgroundColor: "hsla(242,88.4%,66.3%,1)", color: "#fff" } : {color: "hsla(242,88.4%,66.3%,1)"}} eventKey="admin-link-3" href='/course-list' className='link'>Course List</Nav.Link>
        </Nav>
      )}
    </>
  );
}

export default SideNav;