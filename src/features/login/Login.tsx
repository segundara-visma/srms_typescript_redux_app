import React, { useState, FormEvent, useRef } from "react";
import loginImg from "../../images/login1.svg";
import "./style.scss";

import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { login } from "../../actions/auth";
import { Spinner } from "react-bootstrap";
import { loggedInStatus, selectValue } from "./loginSlice";
import Profile from "../user/Profile";
// import { selectMe } from "../user/userSlice";

import { fetchMe } from "../../actions/fetch_Me";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  let navigate = useNavigate();

  const isLoggedIn = useAppSelector(loggedInStatus);
  const userTitle = useAppSelector(selectValue)

  const dispatch = useAppDispatch();

  const getEmail = () => {
    setEmail(`${emailInputRef.current?.value}`);
  };
  const getPassword = () => {
    setPassword(`${passwordInputRef.current?.value}`);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email && password) {
      dispatch(login({email, password}))
        .then(() => {
          console.log('success!!!!!!!!')
          navigate("/profile");
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    dispatch(fetchMe(userTitle))
    console.log('logedInUser =', userTitle)
    console.log('logedIn')
    return <Profile />;
  }

  return (
    <div className="base-container" style={{ height: '100vh' }}>
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
      {!loading && (
        <>
          <div className="content">
            <div className="image">
              <img src={loginImg} alt="loginImg" />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={email}
                  onChange={getEmail}
                  ref={emailInputRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={getPassword}
                  ref={passwordInputRef}
                />
              </div>
            </div>
          </div>

          <div className="footer">
            <button type="button" className="btn" onClick={handleLogin}>
              Login
        </button>
          </div>
        </>
      )}

      {/* {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            <strong>Email and password do not match!</strong>
          </div>
        </div>
      )} */}
      {/* <Alert variant="danger" show={failure} className="mt-3">
        <strong>Please check your email or password!</strong>
      </Alert> */}
    </div>
  );

};

export default Login;
