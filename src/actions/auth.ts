import AuthService from "../services/auth.service";

import { useAppDispatch } from '../app/hooks';
import { loginErrorMessage,
    loginFailure,
    loginSuccess,
    logoutSuccess
} from "../features/login/loginSlice";
import { fetchMe } from "./fetch_Me";

type loginType = {
    email: string,
    password: any
}

export const login = ({email, password}: loginType) => (dispatch = useAppDispatch()) => {
    return AuthService.login({email, password}).then(
        (data) => {
            dispatch(loginSuccess(data))

            setTimeout(() => {
                const loggedInTitle = localStorage.getItem("userTitle")
                if(loggedInTitle) {
                    dispatch(fetchMe(JSON.parse(loggedInTitle)))
                }

                return Promise.resolve();

            }, 2000);
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(loginFailure())

            dispatch(loginErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch = useAppDispatch()) => {
    const isLoggedIn = localStorage.getItem("userTitle");

    isLoggedIn && AuthService.logout();

    dispatch(logoutSuccess())

};