import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../commonStyle/style.scss";
import { useNavigate } from "react-router-dom";
import UserData from "./UserPage";

import { fetchMe } from "../../actions/fetch_Me";

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMe } from "./userSlice";
import Header from "./PageHeader";
import SideNav from "../nav/SideNav";

const Profile = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(selectMe)
  localStorage.setItem('currentUser', JSON.stringify(userInfo));

  const loggedInTitle = localStorage.getItem("userTitle")
  // loggedInTitle && dispatch(fetchMe(JSON.parse(loggedInTitle)))

  useEffect(() => {
    if (loggedInTitle) {
      dispatch(fetchMe(JSON.parse(loggedInTitle)))
      setIsLoggedIn(true)
    } else navigate('/')
    // loggedInTitle ? setIsLoggedIn(true) : navigate('/')
  }, [loggedInTitle, navigate, dispatch])

  return (
    <>
      {isLoggedIn && (
        <>
          <Container fluid>
            <Row>
              <Col sm={2} className="border p-0 side-nav-container" style={{ height: '93vh' }}><SideNav/></Col>
              <Col sm={10}>
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
