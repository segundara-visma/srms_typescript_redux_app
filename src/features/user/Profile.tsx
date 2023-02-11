import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../commonStyle/style.scss";
import { useNavigate } from "react-router-dom";
import UserData from "./UserPage";

import { fetchMe } from "../../actions/fetch_Me";

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMe } from "./userSlice";

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
          <Container className="mt-3">
            <UserData />
          </Container>
        </>
      )}
    </>
  );
};
export default Profile;
