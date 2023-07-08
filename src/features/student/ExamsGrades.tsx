import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Spinner,
  Container,
  Alert,
  Row,
  Col
} from "react-bootstrap";
import "../../commonStyle/style.scss";
import Pagination from "../pagination/Pagination";
import { selectCurrentPage, selectNumOfPages, selectPerPage, setNumOfPages } from "../pagination/paginationSlice";
import RecordsPDF from "./PdfHandler";

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { setExamsDetails, setTotalExams, downloadPDF } from "../../actions/studentData";
import { selectExamsDeatils, selectTotalExams } from "./studentSlice";
import { selectErrorMessage } from "../user/userSlice";
import Header from "../user/PageHeader";
import SideNav from "../nav/SideNav";

const ExamsGrades = () => {
  const [loading, setLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(false);

  const dispatch = useAppDispatch();

  const localcurrent = localStorage.getItem('currentUser')
  const localcurrentUserInfo = localcurrent && JSON.parse(localcurrent)

  const perPage = useAppSelector(selectPerPage)
  const totalExams = useAppSelector(selectTotalExams)
  const examsDetails = useAppSelector(selectExamsDeatils)
  const currentPage = useAppSelector(selectCurrentPage)
  const errorMessage = useAppSelector(selectErrorMessage)

  const nPages = useAppSelector(selectNumOfPages)

  const getPDF = async () => {
    dispatch(downloadPDF(localcurrentUserInfo._id));
    setDownloadStatus(true);
  };

  useEffect(() => {
    setLoading(true)
    if (!totalExams) {
      dispatch(setTotalExams(localcurrentUserInfo._id));
    } else if (totalExams && nPages !== Math.ceil(totalExams / perPage)) {
      console.log('totalExams =', totalExams)
      dispatch(setNumOfPages(Math.ceil(totalExams / perPage)))
    }
    dispatch(setExamsDetails(currentPage, perPage, localcurrentUserInfo._id));

    if (examsDetails?.length || errorMessage) {
      setLoading(false)
    }
  }, [currentPage, perPage, totalExams, dispatch, nPages, localcurrentUserInfo._id, errorMessage, examsDetails?.length]);

  return (
    <Container fluid>
      <Row>
        <Col xs={2}><SideNav/></Col>
        <Col xs={9}>
          <Row>
            <Col><Header/></Col>
          </Row>
          <Row>
            <Col>
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
                {!loading && downloadStatus && (<RecordsPDF />)}
                {!loading && examsDetails && (
                  <>
                    {examsDetails.length < 1 && (
                      <Alert className="text-center">You have not registered for any exam yet!</Alert>
                    )}
                    {examsDetails.length > 0 && (
                      <>
                        <p>
                          <Button className="btn-secondary" onClick={getPDF}>
                            Download Transcript
                          </Button>{" "}
                        </p>
                        <Table responsive="md" size="md">
                          <thead>
                            <tr className="app-table">
                              <th>#</th>
                              <th>Course Name</th>
                              <th>Description</th>
                              <th>Semester</th>
                              <th>Exam Date</th>
                              <th>Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {examsDetails.length > 0 && examsDetails.map((course: {name: '', description: '', semester: '', examdate: '', grade: ''}, i: number) => {
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
                                  <td>{course.grade}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <div className="d-flex justify-content-between pl-3 pagination-container">

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
                {!loading && !examsDetails && errorMessage && (
                  <div className="text-center">
                    <strong>No record at the moment</strong>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default ExamsGrades;
