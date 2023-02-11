import MeService from "../services/me.service";

import { useAppDispatch } from '../app/hooks';
import { clearMeData, setErrorMessage, setMe } from "../features/user/userSlice";
import { LoginState } from "../features/login/loginSlice";

export const fetchMe = (userTitle: LoginState['value']) => (dispatch = useAppDispatch()) => {
    return MeService.getMe(userTitle).then(
        (data) => {
            dispatch(setMe(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            
            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const clearMe = () => (dispatch = useAppDispatch()) => {
    dispatch(clearMeData())
};

export const updateMeProfile = (userTitle: LoginState['value'], updatedInfo: {}) => (dispatch = useAppDispatch()) => {
    return MeService.updateProfileText(userTitle, updatedInfo).then(
        (data) => {
            dispatch(setMe(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};

export const updateMeImage = (userTitle: LoginState['value'], imageFile: File|string|Blob) => (dispatch = useAppDispatch()) => {
    return MeService.updateProfileImage(userTitle, imageFile).then(
        (data) => {
            console.log('data =', data)
            dispatch(setMe(data))

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(setErrorMessage(message))

            return Promise.reject();
        }
    );
};