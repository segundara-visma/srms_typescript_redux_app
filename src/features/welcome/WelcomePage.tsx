import React from 'react';
import "../../commonStyle/style.scss";

const WelcomePage = () => {
    return (
        <div className="jumbo text-center">
            <p className="d-flex flex-column">
                <span>Welcome to the School Portal.</span>
                <span>Login details can be found in <a href="https://cloudy-blue-lion.cyclic.app/api-docs">api-docs</a></span>
            </p>
        </div>
    )
}

export default WelcomePage;
