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
import { format } from "date-fns";
import Pagination from "../pagination/Pagination";
import { selectCurrentPage, selectNumOfPages, selectPerPage, setNumOfPages } from "../pagination/paginationSlice";

import { setTutors, setCoursesDetails, setTotalCourses, setNewCourse, clearNewCourse } from "../../actions/adminData";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAdminDataStatus, selectCoursesDetails, selectNewCourse, selectTotalCourses, selectTutors } from "./adminSlice";
import { selectErrorMessage } from "../user/userSlice";

const CourseList = () => {

  const currentPage = useAppSelector(selectCurrentPage)
  const nPages = useAppSelector(selectNumOfPages)
  const perPage = useAppSelector(selectPerPage)
  const adminStatus = useAppSelector(selectAdminDataStatus)

  const totalCourses = useAppSelector(selectTotalCourses)
  const coursesDetails = useAppSelector(selectCoursesDetails)
  const tutors = useAppSelector(selectTutors)
  const newCourse = useAppSelector(selectNewCourse)
  const errorMessage = useAppSelector(selectErrorMessage)

  const dispatch = useAppDispatch();

  const [newModal, setNewModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [examdate, setExamdate] = useState("");
  const [lecturerID, setLecturerID] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewCourse = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: courseName,
      description: description,
      semester: semester,
      lecturerid: lecturerID,
      examdate: examdate,
    };

    dispatch(setNewCourse(data))

    setTimeout(() => {
      setNewModal(false)
      dispatch(setTotalCourses())
    }, 1000);
  };

  const clearNewCourseStatusAlert = () => {
    // setShow(false);
    dispatch(clearNewCourse());
  }

  const getLecturerID = (e: React.ChangeEvent<HTMLInputElement>) => setLecturerID(e.target.value);

  useEffect(() => {
    setLoading(true)
    if (!totalCourses) {
      dispatch(setTotalCourses())
      dispatch(setTutors())
    } else if (totalCourses && nPages !== Math.ceil(totalCourses / perPage)) {
      dispatch(setNumOfPages(Math.ceil(totalCourses / perPage)))
    }
    dispatch(setCoursesDetails(currentPage, perPage))

    // newCourse && !show && setShow(true)

    if (coursesDetails?.length || errorMessage) {
      setLoading(false)
    }

  }, [dispatch, currentPage, totalCourses, perPage, nPages, adminStatus, coursesDetails?.length, errorMessage]);

  return (
    <Container className="mt-3" style={{ height: '100vh' }}>
      <div>
        {newCourse && newCourse.status === 200 && (
          <Alert variant="info" onClose={clearNewCourseStatusAlert} dismissible>
            <strong>New Course Added</strong>
          </Alert>
        )}
        {newCourse && newCourse.status && newCourse.status !== 200 && (
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
        {!loading && coursesDetails && (
          <>
            <p>
              <Button variant="secondary" className="btn-secondary" onClick={() => setNewModal(true)}>
                Add New Course
              </Button>{" "}
            </p>
            <Table responsive="md" size="md">
              <thead>
                <tr className="app-table">
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Semester</th>
                  <th>Exam Date</th>
                </tr>
              </thead>
              <tbody>
                {coursesDetails.map((course, i) => {
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
                      <td>{format(new Date(course.examdate), "yyyy-MM-dd")}</td>
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
              Add New Course
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="d-flex flex-column" onSubmit={addNewCourse}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="courseName">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      placeholder="Course name here..."
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      placeholder="Description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="semester">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      placeholder="Period of teaching..."
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="examdate">
                    <Form.Label>Exam Date</Form.Label>
                    <Form.Control
                      type="date"
                      required={true}
                      placeholder="Date to conduct exam..."
                      value={examdate}
                      onChange={(e) => setExamdate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="tutors">
                    <Form.Label>Select Tutor</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue=""
                      required
                      onChange={getLecturerID}
                    >
                      <option></option>
                      {tutors && tutors.map((key, i) => {
                        return (
                          <option key={i} value={key._id}>
                            {key.firstname} {key.lastname}
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
                  Add Course
              </Button>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </Container>
  );
};

export default CourseList;
