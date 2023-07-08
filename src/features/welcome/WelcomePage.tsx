import React from 'react';
import "../../commonStyle/style.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const WelcomePage = () => {
    const navigate = useNavigate()
    const loggedIn = localStorage.getItem("userTitle")
    return (
        <>
            {loggedIn ? <Navigate to="/profile"/>
                :(
                    <div className="jumbo text-center">
                        <p className="d-flex flex-column jumbo-content">
                            <span>Welcome to the School Portal.</span>
                            <span>Login details can be found in <a href="https://cloudy-blue-lion.cyclic.app/api-docs">api-docs</a></span>
                            <span>
                                <Button variant="secondary" className="btn-secondary" onClick={() => navigate("/login")}>
                                    Login here
                                </Button>{" "}
                            </span>
                        </p>
                    </div>
                )
            }
        </>
    )
}

export default WelcomePage;
