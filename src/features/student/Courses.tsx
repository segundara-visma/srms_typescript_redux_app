import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Alert,
  Spinner,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";
import "../../commonStyle/style.scss";
import { format } from "date-fns";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  setCoursesDetails,
  setTotalCourses,
  resgisterForCourse,
  resetResgisterForCourse,
  setMyCourseList,
  setTotalRegisteredCourses,
  setExamsDetails,
  setTotalExams
} from "../../actions/studentData";
import { selectCourseDeatils, selectRegisterStatusCode, selectTotalCourses } from "./studentSlice";
import Pagination from "../pagination/Pagination";
import { selectCurrentPage, selectNumOfPages, selectPerPage, setNumOfPages } from "../pagination/paginationSlice";
import { selectErrorMessage } from "../user/userSlice";
import Header from "../user/PageHeader";
import SideNav from "../nav/SideNav";

const AllCourses = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  // const [status, setStatus] = useState('loading')

  const perPage = useAppSelector(selectPerPage)
  const totalCourses = useAppSelector(selectTotalCourses)
  const coursesDetails = useAppSelector(selectCourseDeatils)
  const courseRegisterStatusCode = useAppSelector(selectRegisterStatusCode)
  const errorMessage = useAppSelector(selectErrorMessage)

  const currentPage = useAppSelector(selectCurrentPage)
  const nPages = useAppSelector(selectNumOfPages)

  const localcurrent = localStorage.getItem('currentUser')
  const localcurrentUserInfo = localcurrent && JSON.parse(localcurrent)

  const registerCourse = async (courseid: string, examdate: string) => {

    const data = {
      studentid: localcurrentUserInfo._id,
      courseid: courseid,
      reg_date: format(new Date(), "yyyy-MM-dd"),
      examdate: examdate,
    };

    dispatch(resgisterForCourse(data));

    setTimeout(() => {
      dispatch(resetResgisterForCourse());
      dispatch(setTotalRegisteredCourses(localcurrentUserInfo._id));
      dispatch(setTotalExams(localcurrentUserInfo._id));
      dispatch(setMyCourseList(currentPage, perPage, localcurrentUserInfo._id));
      dispatch(setExamsDetails(currentPage, perPage, localcurrentUserInfo._id));
    }, 5000);

  };

  // /** Set some delay or waiting time when needed */
  // const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  useEffect(() => {
    setLoading(true)
    if (!totalCourses) {
      dispatch(setTotalCourses());
    } else if (totalCourses && nPages !== Math.ceil(totalCourses / perPage)) {
      console.log('totalCourses =', totalCourses)
      dispatch(setNumOfPages(Math.ceil(totalCourses / perPage)))
    }
    dispatch(setCoursesDetails(currentPage, perPage));

    if (coursesDetails?.length || errorMessage) {
      setLoading(false)
    }
  }, [currentPage, totalCourses, dispatch, perPage, nPages, coursesDetails?.length, errorMessage]);

  return (
    <Container fluid>
      <Row>
        <Col sm={2} className="border p-0 side-nav-container" style={{ height: '93vh' }}><SideNav/></Col>
        <Col sm={10}>
          <Row>
            <Col><Header/></Col>
          </Row>
          <Row>
            <Col>
              <div>
                {courseRegisterStatusCode === 200 && (
                  <Alert variant="info">
                    <strong>Course registration successful!!!</strong>
                  </Alert>
                )}
                {courseRegisterStatusCode === 400 && (
                  <Alert variant="danger">
                    <strong>
                      {errorMessage}
                    </strong>
                  </Alert>
                )}
                {courseRegisterStatusCode && courseRegisterStatusCode !== 200 && courseRegisterStatusCode !== 400 && (
                  <Alert variant="danger">
                    <strong>
                      Ooops!!! Registration not completed. Check out with the admin!
                    </strong>
                  </Alert>
                )}
              </div>
              <div>
                {loading && (
                  <div
                    style={{
                      width: "10%",
                      height: "auto",
                      margin: "auto",
                    }}
                  >
                    <Spinner animation="border" variant="dark" />
                  </div>
                )}
                {!loading && totalCourses && coursesDetails && (
                  <>
                    <Table responsive="md" size="md">
                      <thead>
                        <tr className="app-table">
                          <th>#</th>
                          <th>Course Name</th>
                          <th>Description</th>
                          <th>Semester</th>
                          <th>Exam Date</th>
                          <th>Click To Register</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coursesDetails.length > 0 &&
                          coursesDetails.map((course, i) => {
                            return (
                              <tr key={i} className="app-table">
                                <td>
                                  {currentPage > 1
                                    ? (i = i + 1 + perPage * currentPage - perPage)
                                    : (i = i + 1)}
                                </td>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.semester}</td>
                                <td>{course.examdate.slice(0, 10)}</td>
                                <td className="text-center">
                                  <Button
                                    className="btn-secondary"
                                    onClick={() =>
                                      registerCourse(course._id, course.examdate)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faRegistered} />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>

                    <div className="d-flex justify-content-between pl-3">

                      <Pagination
                        numOfPages={nPages}
                      />

                      <Button className="text-right app-variant" disabled>
                        page <strong>{currentPage}</strong> of{" "}
                        <strong>{nPages}</strong>
                      </Button>
                    </div>
                  </>
                )}
                {!loading && !coursesDetails && errorMessage && (
                  <p className="text-center">
                    <strong>No information yet</strong>
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default AllCourses;
