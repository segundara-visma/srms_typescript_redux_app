import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'
import { selectMe, UserState } from '../user/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const SideNav = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [isNotActive, setNotActive] = useState(true);

  const title = localStorage.getItem("userTitle")
  const loggedInTitle = title && JSON.parse(title)

  const meInfo = useAppSelector(selectMe)
  const [currentUserInfo, setCurrentUserInfo] = useState<UserState['me']>(meInfo)

  useEffect(() => {

      const localcurrent = localStorage.getItem('currentUser')
      if (localcurrent) {
          const currentUser = JSON.parse(localcurrent)
          setCurrentUserInfo(currentUser)
      }
  }, [meInfo])

  return (
    <div>
      <div className="wrapper">
        <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <button
            type="button"
            id="sidebarCollapse"
            onClick={() => setNotActive(!isNotActive)}
            className="btn btn-custom"
          >
            <span className={ isNotActive ? '' : 'hidden' }><FontAwesomeIcon icon={faBars} style={{ marginLeft: "2px", marginRight: "2px" }}/></span>
            <span className={ isNotActive ? 'hidden' : '' }><FontAwesomeIcon icon={faTimesCircle} style={{ marginLeft: "2px", marginRight: "2px" }}/></span>
          </button>
          <div className="sidebar-header">
            <img
              src={currentUserInfo.image}
              className="rounded-circle usr-image"
              height={isNotActive ? "20" : "70"}
              width={isNotActive ? "20" : "70"}
              alt={"user"}
            ></img>
            <h3>{currentUserInfo.firstname} {currentUserInfo.lastname}</h3>
          </div>

          <ul className="list-unstyled components">
            <li className="list-item" style={location.pathname === '/profile' ? { border: "1px solid white" } : {border: "none"}}>
              <Link to="/profile">My Profile</Link>
            </li>
            {loggedInTitle === "student" && (
              <>
              <li className="list-item" style={location.pathname === '/courses' ? { border: "2px solid white" } : {border: "none"}}>
                <Link to="/courses">All Courses</Link>
              </li>
              <li className="list-item" style={location.pathname === '/my-courses' ? { border: "2px solid white" } : {border: "none"}}>
                <Link to="/my-courses">My Courses</Link>
              </li>
              <li className="list-item" style={location.pathname === '/exams' ? { border: "2px solid white" } : {border: "none"}}>
                <Link to="/exams">Exams</Link>
              </li>
              </>
            )}
            {loggedInTitle === "tutor" && (
              <>
              <li className="list-item" style={location.pathname === '/my-students' ? { border: "2px solid white" } : {border: "none"}}>
                <Link to="/my-students">Students</Link>
              </li>
              <li className="list-item" style={location.pathname === '/exams-grades' ? { border: "2px solid white" } : {border: "none"}}>
                <Link to="/exams-grades">Exams</Link>
              </li>
              </>
            )}
            {loggedInTitle === "admin" && (
              <>
              <li className="list-item" style={location.pathname === '/students-list' ? { border: "2px solid white" } : {border: "none"}}>
                <Link to="/students-list">Students List</Link>
              </li>
              <li className="list-item" style={location.pathname === '/tutors-list' ? { border: "2px solid white" } : {border: "none"}}>
                <Link to="/tutors-list">Tutors List</Link>
              </li>
              <li className="list-item" style={location.pathname === '/course-list' ? { border: "2px solid white" } : {border: "none"}}>
                <Link to="/course-list">Course List</Link>
              </li>
              </>
            )}
          </ul>
        </nav>
        <div className={ isNotActive ? 'hidden' : 'text-center mb-2' }>
          <Button variant="secondary" className="btn-secondary" onClick={() => navigate("/logout")}>
            Logout
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default SideNav;