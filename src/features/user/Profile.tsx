import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../commonStyle/style.scss";
import { useNavigate } from "react-router-dom";
import UserData from "./UserPage";

import { useAppDispatch } from '../../app/hooks';
import Header from "./PageHeader";
import SideNav from "../nav/SideNav";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  const loggedInTitle = localStorage.getItem("userTitle")

  useEffect(() => {
    if (loggedInTitle) {
      setIsLoggedIn(true)
    } else {
      navigate('/login')
    }
  }, [loggedInTitle, navigate, dispatch])

  return (
    <>
      {isLoggedIn && (
        <>
          <Container fluid>
            <Row>
              <Col xs={2}><SideNav/></Col>
              <Col xs={9}>
                <Row>
                  <Col><Header/></Col>
                </Row>
                <Row>
                  <Col><UserData /></Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
export default Profile;
