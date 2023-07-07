import React, { useState, useEffect } from "react";
import {
  Table,
  Spinner,
  Container,
  Button,
  Alert,
  Row,
  Col
} from "react-bootstrap";
import "../../commonStyle/style.scss";
import Pagination from "../pagination/Pagination";
import { selectCurrentPage, selectNumOfPages, selectPerPage, setNumOfPages } from "../pagination/paginationSlice";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { setMyCourseList, setTotalRegisteredCourses } from "../../actions/studentData";
import { selectCourseList, selectTotalRegisteredCourses } from "./studentSlice";
import { selectErrorMessage } from "../user/userSlice";
import Header from "../user/PageHeader";
import SideNav from "../nav/SideNav";

const MyCourses = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const localcurrent = localStorage.getItem('currentUser')
  const localcurrentUserInfo = localcurrent && JSON.parse(localcurrent)

  const perPage = useAppSelector(selectPerPage)
  const totalRegisteredCourses = useAppSelector(selectTotalRegisteredCourses)
  const myCourseList = useAppSelector(selectCourseList)
  const currentPage = useAppSelector(selectCurrentPage)
  const errorMessage = useAppSelector(selectErrorMessage)

  const nPages = useAppSelector(selectNumOfPages)

  useEffect(() => {
    setLoading(true)
    if (!totalRegisteredCourses) {
      dispatch(setTotalRegisteredCourses(localcurrentUserInfo._id));
    } else if (totalRegisteredCourses && nPages !== Math.ceil(totalRegisteredCourses / perPage)) {
      console.log('totalRegisteredCourses =', totalRegisteredCourses)
      dispatch(setNumOfPages(Math.ceil(totalRegisteredCourses / perPage)))
    }
    dispatch(setMyCourseList(currentPage, perPage, localcurrentUserInfo._id));

    if (myCourseList?.length || errorMessage) {
      setLoading(false)
    }
  }, [totalRegisteredCourses, currentPage, dispatch, perPage, localcurrentUserInfo._id, nPages, errorMessage, myCourseList?.length]);

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
              {!loading && myCourseList && (
                <>
                  {myCourseList.length < 1 && (
                    <Alert className="text-center">You have not registered for any course yet!</Alert>
                  )}
                  {myCourseList.length > 0 && (
                    <>
                    <Table responsive="md" size="md">
                      <thead>
                        <tr className="app-table">
                          <th>#</th>
                          <th>Course Name</th>
                          <th>Description</th>
                          <th>Semester</th>
                          <th>Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myCourseList.map((course, i) => {
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
                              <td>{course.reg_date.slice(0, 10)}</td>
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
                </>
              )}
              {!loading && !myCourseList && errorMessage && (
                <div className="text-center">
                  <strong>No record at the moment</strong>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default MyCourses;
