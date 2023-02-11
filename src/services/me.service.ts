import axios from "axios";
import authAxios from "../lib/http"
import Cookies from "js-cookie"
import { LoginState } from "../features/login/loginSlice";

const getMe = (userTitle: LoginState['value']) => {
    return authAxios.get(`/${userTitle}/me`, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.get(`${process.env.REACT_APP_API_URL}/${userTitle}/me`, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data;
                    });
            }
            return response.data;
        });
};

const updateProfileText = (userTitle: LoginState['value'], data: {}) => {
    return authAxios.put(`/${userTitle}/me`, data, { withCredentials: true })
        .then((response) => {
            if (!response) {
                return axios.put(`${process.env.REACT_APP_API_URL}/${userTitle}/me`, data, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data;
                    });
            }
            return response.data;
        });

};

const updateProfileImage = (userTitle: LoginState['value'], data: File|string|Blob) => {
    let formData = new FormData();
    formData.append("file", data);

    return authAxios.post(`/${userTitle}/upload/me`, formData, { withCredentials: true })
        .then((response) => {
            if (!response) {
                console.log('formData-2 =', formData)
                return axios.post(`${process.env.REACT_APP_API_URL}/${userTitle}/upload/me`, formData, {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                })

                    .then((response) => {
                        return response.data;
                    });
            }
            console.log('response =', response.data)
            return response.data;
        });

};

const meServiceObjects = {
    getMe,
    updateProfileText,
    updateProfileImage
}

export default meServiceObjects;