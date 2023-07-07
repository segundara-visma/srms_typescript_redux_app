import React from 'react';
import "../../commonStyle/style.scss";
import { Navigate } from "react-router-dom";

const WelcomePage = () => {
    const loggedIn = localStorage.getItem("userTitle")
    return (
        <>
            {loggedIn ? <Navigate to="/profile"/>
                :(
                    <div className="jumbo text-center">
                        <p className="d-flex flex-column">
                            <span>Welcome to the School Portal.</span>
                            <span>Login details can be found in <a href="https://cloudy-blue-lion.cyclic.app/api-docs">api-docs</a></span>
                        </p>
                    </div>
                )
            }
        </>
    )
}

export default WelcomePage;
