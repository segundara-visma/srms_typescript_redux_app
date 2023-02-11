import axios from "axios";
import authAxios from "../lib/http"
import Cookies from "js-cookie"

type loginType = {
    email: string,
    password: any
}

const login = ({email, password}: loginType) => {
    return axios
        .post(`${process.env.REACT_APP_API_URL}/users/login`, {
            email,
            password,
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        )
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem("userTitle", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    const res = authAxios.post(`/users/logout`, {}, { withCredentials: true })
    let response: any;

    if (!res) {
        const secondRes = axios.post(`${process.env.REACT_APP_API_URL}/users/logout`, {}, {
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
            withCredentials: true,
        })
        response = secondRes
    }
    else {
        response = res
    }
    if (response.status === 200) {
        // localStorage.removeItem("user");
        localStorage.clear();
    }
    // localStorage.removeItem("user");
};

const authServiceObjects = {
    login,
    logout,
};

export default authServiceObjects;