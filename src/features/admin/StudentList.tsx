import React, { useState, useEffect, FormEvent } from "react";
import "../../commonStyle/style.scss";
import {
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Alert,
  Spinner,
  Container
} from "react-bootstrap";

import Pagination from "../pagination/Pagination";
import { selectCurrentPage, selectNumOfPages, selectPerPage, setNumOfPages } from "../pagination/paginationSlice";

import { setDepartmentsDetails, setStudentsDetails, setTotalStudents, setNewStudent, clearNewStudent } from "../../actions/adminData";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAdminDataStatus, selectDepartmentsDetails, selectNewStudent, selectStudentsDetails, selectTotalStudents } from "./adminSlice";
import { selectErrorMessage } from "../user/userSlice";
import Header from "../user/PageHeader";
import SideNav from "../nav/SideNav";

const StudentList = () => {

  const currentPage = useAppSelector(selectCurrentPage)
  const nPages = useAppSelector(selectNumOfPages)
  const perPage = useAppSelector(selectPerPage)

  const totalStudents = useAppSelector(selectTotalStudents)
  const departmentsDetails = useAppSelector(selectDepartmentsDetails)
  const studentsDetails = useAppSelector(selectStudentsDetails)
  const newStudent = useAppSelector(selectNewStudent)
  const errorMessage = useAppSelector(selectErrorMessage)
  const adminStatus = useAppSelector(selectAdminDataStatus)

  const dispatch = useAppDispatch();

  const [newModal, setNewModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [password, setPassword] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [loading, setLoading] = useState(false);

  const registerStudent = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      dateofbirth: dateofbirth,
      nationality: nationality,
      departmentid: selectedID,
      password: password,
      title: "student",
    };

    dispatch(setNewStudent(data))

    setTimeout(() => {
      setNewModal(false)
      dispatch(setTotalStudents())
    }, 1000);
  };

  const clearNewStudentStatusAlert = () => {
    // setShow(false);
    dispatch(clearNewStudent());
  }

  const getSelectedID = (e: React.ChangeEvent<HTMLInputElement>) => setSelectedID(e.target.value);

  useEffect(() => {
    setLoading(true)
    if (!totalStudents) {
      dispatch(setTotalStudents())
      dispatch(setDepartmentsDetails())
    } else if (totalStudents && nPages !== Math.ceil(totalStudents / perPage)) {
      dispatch(setNumOfPages(Math.ceil(totalStudents / perPage)))
    }
    dispatch(setStudentsDetails(currentPage, perPage))

    // newStudent && !show && setShow(true)

    if (studentsDetails?.length || errorMessage) {
      setLoading(false)
    }

  }, [currentPage, perPage, totalStudents, dispatch, nPages, adminStatus, errorMessage, studentsDetails?.length]);

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
                {newStudent && newStudent.status === 201 && (
                  <Alert variant="info" onClose={clearNewStudentStatusAlert} dismissible>
                    <strong>Student successfully registered</strong>
                  </Alert>
                )}
                {newStudent && newStudent.status && newStudent.status !== 201 && (
                  <Alert variant="danger">
                    <strong>Something went wrong!!!</strong>
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
                {!loading && studentsDetails && (
                  <>
                    <p>
                      <Button variant="secondary" className="btn-secondary" onClick={() => setNewModal(true)}>
                        Register New Student
                      </Button>{" "}
                    </p>
                    <Table responsive="md" size="md">
                      <thead>
                        <tr className="app-table">
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Nationality</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsDetails.map((student: {email: '', firstname: '', lastname: '', nationality: ''}, i: number) => {
                          return (
                            <tr key={i} className="app-table">
                              <td>
                                {currentPage > 1
                                  ? (i = i + 1 + perPage * currentPage - perPage)
                                  : (i = i + 1)}
                              </td>
                              <td>{student.firstname}</td>
                              <td>{student.lastname}</td>
                              <td>{student.email}</td>
                              <td>{student.nationality}</td>
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
                {!loading && !studentsDetails && errorMessage && (
                  <p className="text-center">
                    <strong>No information yet</strong>
                  </p>
                )}
              </div>
              <Modal
                size="lg"
                show={newModal}
                onHide={() => setNewModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
              >
                <div className='app-modal'>
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      Add New Student
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form className="d-flex flex-column" onSubmit={registerStudent}>
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="firstname">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                              type="text"
                              required={true}
                              placeholder="What is firstname.."
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="lastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                              type="text"
                              required={true}
                              placeholder="What is lastname.."
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              required={true}
                              placeholder="Email here.."
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="dateofbirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                              type="date"
                              required={true}
                              placeholder="Date of Birth..."
                              value={dateofbirth}
                              onChange={(e) => setDateofbirth(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="nationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control
                              type="text"
                              required={true}
                              placeholder="Nationality..."
                              value={nationality}
                              onChange={(e) => setNationality(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              required={true}
                              placeholder="Password..."
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group controlId="departments">
                            <Form.Label>Select Department</Form.Label>
                            <Form.Control
                              as="select"
                              defaultValue=""
                              required
                              onChange={getSelectedID}
                            >
                              <option></option>
                              {departmentsDetails && departmentsDetails.map((key, i) => {
                                return (
                                  <option key={i} value={key._id}>
                                    {key.name}
                                  </option>
                                );
                              })}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-center mt-3">
                        <Button
                          className="align-self-center mr-4 btn-secondary"
                          // variant="warning"
                          type="submit"
                        >
                          Add Student
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
};

export default StudentList;
