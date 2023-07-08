import React, { useState, useEffect, FormEvent } from "react";
import {
  Row,
  Col,
  Tab,
  Nav,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Container,
} from "react-bootstrap";
import "../../commonStyle/style.scss";
import { format } from "date-fns";

import Pagination from "../pagination/Pagination";
import { selectCurrentPage, selectNumOfPages, selectPerPage, setCurrentPage, setNumOfPages } from "../pagination/paginationSlice";

import { setGradingService, clearGradingService, setTotalStudentsByExam, setExamsRecords } from "../../actions/tutorData";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectExamsRecords, selectGradingService, selectMyCourseList, selectTotalStudentsByExam } from "./tutorSlice";
import { selectErrorMessage } from "../user/userSlice";
import Header from "../user/PageHeader";
import SideNav from "../nav/SideNav";

function ExamsGradesFromTutor() {
  const [tab, setTab] = useState(0);
  const [courseID, setCourseID] = useState('');
  const [tabSwitched, setTabSwitched] = useState(false);

  const currentPage = useAppSelector(selectCurrentPage)
  const nPages = useAppSelector(selectNumOfPages)
  const perPage = useAppSelector(selectPerPage)

  const localcurrent = localStorage.getItem('currentUser')
  const info = localcurrent && JSON.parse(localcurrent)

  const totalStudentsByExam = useAppSelector(selectTotalStudentsByExam);
  const gradingService = useAppSelector(selectGradingService);
  const examsRecords = useAppSelector(selectExamsRecords);
  const myCourseList = useAppSelector(selectMyCourseList);
  const errorMessage = useAppSelector(selectErrorMessage);

  const dispatch = useAppDispatch();

  const userID = info._id;

  const [grade, setGrade] = useState("");
  const [gradeModal, setGradeModal] = useState(false);
  const [examid, setExamid] = useState("");
  const [studentid, setStudentid] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");

  const updateGrade = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      grade: grade,
    };

    dispatch(setGradingService(data, studentid, examid));
    setGradeModal(false)
    setGrade("")
  };

  const clearGradingAlert = () => {
    dispatch(clearGradingService());
  }

  const handleTabChange = (i: number, courseid: string) => {
    setTab(i)
    setCourseID(courseid)
    dispatch(setCurrentPage(1))
    setTabSwitched(true)
  }

  useEffect(() => {
    setLoading(true)

    if (!totalStudentsByExam) {
      dispatch(setTotalStudentsByExam(userID));
    } else {
      if (tabSwitched) {
        dispatch(setNumOfPages(Math.ceil(totalStudentsByExam[tab] / perPage)))
        dispatch(setExamsRecords(currentPage, perPage, userID, courseID));
      } else if (!tabSwitched) {
        dispatch(setNumOfPages(Math.ceil(totalStudentsByExam[tab] / perPage)))
        dispatch(setExamsRecords(currentPage, perPage, userID, courseID));
      }
    }

    setTabSwitched(false)

    if ((examsRecords?.length && myCourseList?.length  && totalStudentsByExam) || errorMessage) {
      setLoading(false)
    }

  }, [currentPage, perPage, userID, totalStudentsByExam, dispatch, gradingService, tab, tabSwitched, courseID, examsRecords?.length, myCourseList?.length, errorMessage]);

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
              {gradingService && gradingService.status === 200 && (
                <Alert variant="info" onClose={clearGradingAlert} dismissible>
                  <strong>Graded successfully!!!</strong>
                </Alert>
              )}
              {gradingService && gradingService.status && gradingService.status !== 200 && (
                <Alert variant="info">
                  <strong>Problem ecountered while trying to save the grade!!!</strong>
                </Alert>
              )}
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
              {!loading && !examsRecords && (
                <Alert className="text-center">No record found!</Alert>
              )}
              {!loading && examsRecords && myCourseList && totalStudentsByExam && (
                <>
                {myCourseList.length > 0 && (
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="0"
                  >
                    <Row>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                          {myCourseList.map((course: { name: '', _id: ''}, i: number) => {
                            return (
                              <Nav.Item key={i}>
                                <Nav.Link
                                  eventKey={i}
                                  className="d-flex justify-content-between btn-link px-1"
                                  onClick={() => handleTabChange(i, course._id)}
                                >
                                  <small>
                                    <b>{course.name}</b>
                                  </small>
                                  <span className="badge">{totalStudentsByExam[i]}</span>
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </Col>
                      <Col sm={9}>
                        <Tab.Content>
                          {examsRecords.length < 1 && (
                            <Alert className="text-center">No student on this exam</Alert>
                          )}
                          {examsRecords.length > 0 && (
                          <>
                            <Table responsive="md" size="md">
                              <thead>
                                <tr className="app-table">
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Exam date</th>
                                  <th>Grade</th>
                                  <th>Upload Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                {examsRecords.map((s: {firstname: '', lastname: '', examdate: '',grade: '', _id: '', studentid: ''}, i: number) => {
                                  return (
                                    <tr key={i} className="app-table">
                                      <td>
                                        {currentPage > 1
                                          ? (i =
                                            i +
                                            1 +
                                            perPage * currentPage -
                                            perPage)
                                          : (i = i + 1)}
                                      </td>
                                      <td>{s.firstname}</td>
                                      <td>{s.lastname}</td>
                                      <td>
                                        {format(
                                          new Date(s.examdate),
                                          "yyyy-MM-dd"
                                        )}
                                      </td>
                                      <td className="text-center">{s.grade}</td>
                                      <td className="text-center">
                                        <Button
                                          variant="secondary"
                                          className="btn-secondary"
                                          onClick={() => {
                                            setGradeModal(true);
                                            setExamid(s._id);
                                            setStudentid(s.studentid);
                                            setRecipientFirstName(s.firstname);
                                            setRecipientLastName(s.lastname);
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </td>
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
                          </>)}
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                )}
              </>
              )}
              {!loading && errorMessage && !examsRecords && !myCourseList && !totalStudentsByExam && (
                <p className="text-center">
                  <strong>No record at the moment!</strong>
                </p>
              )}
              <Modal
                show={gradeModal}
                onHide={() => setGradeModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
              >
                <div className='app-modal'>
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      Update Grade for {recipientFirstName} {recipientLastName}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      className="d-flex flex-column"
                      onSubmit={updateGrade}
                    >
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="grade">
                            <Form.Label>Grade</Form.Label>
                            <Form.Control
                              type="text"
                              required={true}
                              placeholder="Enter Grade"
                              value={grade}
                              onChange={(e) =>
                                setGrade(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center mt-3">
                        <Button
                          className="align-self-center mr-4 btn-secondary"
                          // variant="warning"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </Modal.Body>
                </div>
              </Modal>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ExamsGradesFromTutor;
