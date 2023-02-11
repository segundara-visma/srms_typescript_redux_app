import React, { FormEvent } from 'react';
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { format } from "date-fns";

interface TextModalProps {
    userTitle: string,
    profileText: boolean,
    firstname: string,
    lastname: string,
    email: string,
    dob: string,
    nationality: string,
    setModalForText: (e: boolean) => void,
    updateProfileText: (e: FormEvent) => void,
    set_F_Name: (e: string) => void,
    set_L_Name: (e: string) => void,
    set_Email: (e: string) => void,
    set_DOB: (e: string) => void,
    set_Nationality: (e: string) => void
}

const TextModal = ({ userTitle, profileText, setModalForText, updateProfileText, firstname, set_F_Name, lastname, set_L_Name, email, set_Email, dob, set_DOB, nationality, set_Nationality }: TextModalProps) => {
    return (
        <div >
            {userTitle === "student"
                ?
                <Modal
                    size="lg"
                    show={profileText}
                    onHide={() => setModalForText(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                    centered
                >
                    <div className='app-modal'>
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                Update Profile Text
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="d-flex flex-column" onSubmit={updateProfileText}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="firstname">
                                            <Form.Label>Firstname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="What is/was your firstname.."
                                                value={firstname}
                                                onChange={(e) => set_F_Name(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="lastname">
                                            <Form.Label>Lastname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="What is/was your lastname.."
                                                value={lastname}
                                                onChange={(e) => set_L_Name(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="What is/was your email.."
                                                value={email}
                                                onChange={(e) => set_Email(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="dateofbirth">
                                            <Form.Label>D.O.B</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={dob && format(new Date(dob), "yyyy-MM-dd")}
                                                onChange={(e) => set_DOB(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="nationality">
                                            <Form.Label>Nationality</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Which country are you from"
                                                value={nationality}
                                                onChange={(e) => set_Nationality(e.target.value)}
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
                                        Update Now
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </div>
                </Modal>
                :
                <Modal
                    show={profileText}
                    onHide={() => setModalForText(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                    centered
                >
                    <div className='app-modal'>
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm" className="align-self-center">
                                Update Profile Text
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="d-flex flex-column" onSubmit={updateProfileText}>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="firstname">
                                            <Form.Label>Firstname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="What is/was your firstname.."
                                                value={firstname}
                                                onChange={(e) => set_F_Name(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="lastname">
                                            <Form.Label>Lastname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="What is/was your lastname.."
                                                value={lastname}
                                                onChange={(e) => set_L_Name(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="What is/was your email.."
                                                value={email}
                                                onChange={(e) => set_Email(e.target.value)}
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
                                        Update Now
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default TextModal
