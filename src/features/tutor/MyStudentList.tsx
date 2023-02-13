import React, { useState, useEffect, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  Tab,
  Nav,
  Table,
  Alert,
  Button,
  Form,
  Modal,
  Spinner,
  Container
} from "react-bootstrap";
import "../../commonStyle/style.scss";

import Pagination from "../pagination/Pagination";
import { selectCurrentPage, selectNumOfPages, selectPerPage, setCurrentPage, setNumOfPages } from "../pagination/paginationSlice";

import { setEmailService, clearEmailService, setTotalStudentsByCourse, setMyStudentsList } from "../../actions/tutorData";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectEmailService, selectMyCourseList, selectMyStudentsList, selectTotalStudentsByCourse } from "./tutorSlice";
import { selectErrorMessage } from "../user/userSlice";

const StudentList = () => {
  const [tab, setTab] = useState(0);
  const [courseID, setCourseID] = useState('');
  const [tabSwitched, setTabSwitched] = useState(false);

  const currentPage = useAppSelector(selectCurrentPage)
  const nPages = useAppSelector(selectNumOfPages)
  const perPage = useAppSelector(selectPerPage)

  const localcurrent = localStorage.getItem('currentUser')
  const info = localcurrent && JSON.parse(localcurrent)

  const totalStudentsByCourse = useAppSelector(selectTotalStudentsByCourse);
  const myStudentsList = useAppSelector(selectMyStudentsList);
  const myCourseList = useAppSelector(selectMyCourseList);
  const emailService = useAppSelector(selectEmailService);
  const errorMessage = useAppSelector(selectErrorMessage);

  const dispatch = useAppDispatch();

  const userID = info._id;

  const [emailModal, setEmailModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(false);

  const setEmailProcess = (s: {email: '', firstname: '', lastname: ''}) => {
    setEmailModal(true);
    setRecipientEmail(s.email);
    setRecipientFirstName(s.firstname);
    setRecipientLastName(s.lastname);
  }

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      recipient: recipientEmail,
      subject: emailSubject,
      content: emailContent,
    };

    dispatch(setEmailService(data));

    setEmailModal(false)
    setEmailSubject("")
    setEmailContent("")

  };

  const clearEmailAlert = () => {
    dispatch(clearEmailService());
  }

  const handleTabChange = (i: number, courseid: string) => {
    setTab(i)
    setCourseID(courseid)
    dispatch(setCurrentPage(1))
    setTabSwitched(true)
  }

  // /** Set some delay or waiting time when needed */
  // const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  useEffect(() => {
    setLoading(true)

    if (!totalStudentsByCourse) {
      dispatch(setTotalStudentsByCourse(userID));
    } else {
      if (tabSwitched) {
        dispatch(setNumOfPages(Math.ceil(totalStudentsByCourse[tab] / perPage)))
        dispatch(setMyStudentsList(currentPage, perPage, userID, courseID));
      } else if (!tabSwitched) {
        dispatch(setNumOfPages(Math.ceil(totalStudentsByCourse[tab] / perPage)))
        dispatch(setMyStudentsList(currentPage, perPage, userID, courseID));
      }
    }

    setTabSwitched(false)

    if ((myStudentsList?.length && myCourseList?.length  && totalStudentsByCourse) || errorMessage) {
      setLoading(false)
    }

  }, [currentPage, perPage, userID, totalStudentsByCourse, dispatch, tab, tabSwitched, courseID, myStudentsList?.length, myCourseList?.length, errorMessage]);

  return (
    <Container className="mt-3" style={{ height: '100vh' }}>
      <div>
        {emailService && emailService.status === 200 && (
          <Alert variant="info" onClose={clearEmailAlert} dismissible>
            <strong>Message sent successfully!!!</strong>
          </Alert>
        )}
        {emailService && emailService.status && emailService.status !== 200 && (
          <Alert variant="danger">
            <strong>Problem ecountered while trying to send your message!!!</strong>
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
        {!loading && myStudentsList && myCourseList  && totalStudentsByCourse && (
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
                          <span className="badge">{totalStudentsByCourse[i]}</span>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {myStudentsList.length < 1 && (
                    <Alert className="text-center">No student on this course</Alert>
                  )}
                  {myStudentsList.length > 0 && (
                  <>
                    <Table responsive="md" size="md">
                      <thead>
                        <tr className="app-table">
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myStudentsList.map((s: {firstname: '', lastname: '', email: ''}, i: number) => {
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
                              <td className="text-center">
                                <Button
                                  className="btn-secondary"
                                  onClick={() => setEmailProcess(s)}
                                >
                                  <FontAwesomeIcon icon={faEnvelope} />
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
                  </>)}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        )}
        {!loading && errorMessage && !myStudentsList && !myCourseList  && !totalStudentsByCourse &&  (
          <p className="text-center">
            <strong>No record at the moment!</strong>
          </p>
        )}
      </div>
      <Modal
        size="lg"
        show={emailModal}
        onHide={() => setEmailModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <div className='app-modal'>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Sending Email To {recipientFirstName} {recipientLastName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className="d-flex flex-column"
              onSubmit={sendEmail}
            >
              <Row>
                <Col md={12}>
                  <Form.Group controlId="subject">
                    <Form.Label>
                      Subject
                  </Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      placeholder="Enter Subject"
                      value={emailSubject}
                      onChange={(e) =>
                        setEmailSubject(
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="content">
                    <Form.Label>
                      Content
                  </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required={true}
                      placeholder="Enter Content"
                      value={emailContent}
                      onChange={(e) =>
                        setEmailContent(
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center mt-3">
                <Button
                  className="align-self-center mr-4 btn-secondary"
                  type="submit"
                >
                  Send
              </Button>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </Container>
  );
};

export default StudentList;
