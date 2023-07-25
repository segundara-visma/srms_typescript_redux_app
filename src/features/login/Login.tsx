import React, { useState, FormEvent, useRef } from "react";
import loginImg from "../../images/login1.svg";
import "./style.scss";

import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { login } from "../../actions/auth";
import { Alert, Spinner } from "react-bootstrap";
import { authError } from "./loginSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  let navigate = useNavigate();

  const dispatch = useAppDispatch();
  const error = useAppSelector(authError)

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
      setTimeout(() => {
        const user = localStorage.getItem('userTitle')
        if (user) {
          navigate("/profile");
        } else {
          setLoading(false)
        }
      }, 5000);
    } else {
      setLoading(false);
    }
  };

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

      <Alert variant="danger" show={!!error} className="mt-3">
        <strong>Please check your email or password!</strong>
      </Alert>
    </div>
  );

};

export default Login;
