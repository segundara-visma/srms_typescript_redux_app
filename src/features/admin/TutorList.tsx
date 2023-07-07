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

import { setDepartmentsDetails, setTutorsDetails, setTotalTutors, setNewTutor, clearNewTutor } from "../../actions/adminData";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAdminDataStatus, selectDepartmentsDetails, selectNewTutor, selectTotalTutors, selectTutorsDetails } from "./adminSlice";
import { selectErrorMessage } from "../user/userSlice";
import Header from "../user/PageHeader";
import SideNav from "../nav/SideNav";

const TutorList = () => {

  const currentPage = useAppSelector(selectCurrentPage)
  const nPages = useAppSelector(selectNumOfPages)
  const perPage = useAppSelector(selectPerPage)

  const totalTutors = useAppSelector(selectTotalTutors)
  const tutorsDetails = useAppSelector(selectTutorsDetails)
  const departmentsDetails = useAppSelector(selectDepartmentsDetails)
  const newTutor = useAppSelector(selectNewTutor)
  const errorMessage = useAppSelector(selectErrorMessage)
  const adminStatus = useAppSelector(selectAdminDataStatus)

  const dispatch = useAppDispatch();

  const [newModal, setNewModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [loading, setLoading] = useState(false);

  const registerTutor = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      departmentid: selectedID,
      password: password,
      title: "tutor",
    };

    dispatch(setNewTutor(data))

    setTimeout(() => {
      setNewModal(false)
      dispatch(setTotalTutors())
    }, 1000);
  };

  const clearNewTutorStatusAlert = () => {
    // setShow(false);
    dispatch(clearNewTutor());
  }

  const getSelectedID = (e: React.ChangeEvent<HTMLInputElement>) => setSelectedID(e.target.value);

  useEffect(() => {
    setLoading(true)
    if (!totalTutors) {
      dispatch(setTotalTutors())
      dispatch(setDepartmentsDetails())
    } else if (totalTutors && nPages !== Math.ceil(totalTutors / perPage)) {
      dispatch(setNumOfPages(Math.ceil(totalTutors / perPage)))
    }
    dispatch(setTutorsDetails(currentPage, perPage))

    // newTutor && !show && setShow(true)

    if (tutorsDetails?.length || errorMessage) {
      setLoading(false)
    }

  }, [dispatch, currentPage, totalTutors, perPage, nPages, adminStatus, tutorsDetails?.length, errorMessage]);

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
                {newTutor && newTutor.status === 200 && (
                  <Alert variant="info" onClose={clearNewTutorStatusAlert} dismissible>
                    <strong>New Tutor Added</strong>
                  </Alert>
                )}
                {newTutor && newTutor.status && newTutor.status !== 200 && (
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
                {!loading && tutorsDetails && (
                  <>
                    <p>
                      <Button variant="secondary" className="btn-secondary" onClick={() => setNewModal(true)}>
                        Register New Tutor
                      </Button>{" "}
                    </p>
                    <Table responsive="md" size="md">
                      <thead>
                        <tr className="app-table">
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tutorsDetails.length > 0 &&
                          tutorsDetails.map((tutor: {firstname: '', lastname: '', email: '',}, i: number) => {
                            return (
                              <tr key={i} className="app-table">
                                <td>
                                  {currentPage > 1
                                    ? (i = i + 1 + perPage * currentPage - perPage)
                                    : (i = i + 1)}
                                </td>
                                <td>{tutor.firstname}</td>
                                <td>{tutor.lastname}</td>
                                <td>{tutor.email}</td>
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
                {!loading && !tutorsDetails && errorMessage && (
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
                      Add New Tutor
                  </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form className="d-flex flex-column" onSubmit={registerTutor}>
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
                        </Col>
                        <Col md={6}>
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
                          Add Tutor
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

export default TutorList;
