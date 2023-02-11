import React, { useRef, FormEvent } from 'react';
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

interface ImageModalProps {
    profileImage: any,
    setModalForImage: (e: boolean) => void,
    updateProfileImage: (e: FormEvent) => void,
    saveImg: (e: React.ChangeEvent<HTMLInputElement>) => void
}

declare module 'react' {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
      // extends React's HTMLAttributes
      profile?: string;
    }
}

const ImageModal = ({ profileImage, setModalForImage, updateProfileImage, saveImg }: ImageModalProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <Modal
                show={profileImage}
                onHide={() => setModalForImage(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
            >
                <div className='app-modal'>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm" style={{ }}>
                            Update Profile Image
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="d-flex flex-column" onSubmit={updateProfileImage}>
                            <Row>
                                <Col md={6}>
                                    <label>Image</label>
                                    <br></br>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        profile="file"
                                        onChange={saveImg}
                                        accept="imageFile/*"
                                        ref={inputRef}
                                    />
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center mt-3">
                                <Button
                                    className="align-self-center mr-4 btn-secondary"
                                    // variant="info"
                                    type="submit"
                                >
                                    Update Photo
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    )
}

export default ImageModal
