import React, { useState, useEffect } from 'react';
import "../../commonStyle/style.scss";

import { useAppSelector } from '../../app/hooks';
import { LoginState, selectValue } from '../login/loginSlice';
import { selectMe, selectUserStatus, UserState } from './userSlice';
import StudentDetail from '../student/Student';
import TutorDetail from '../tutor/Tutor';
import AdminDetail from '../admin/Admin';
import {
    Spinner
  } from "react-bootstrap";

const UserData = () => {
    // const [loading, setLoading] = useState(false);
    const [userTitle, setUserTitle] = useState<LoginState['value']>();
    const [currentUser, setCurrentUser] = useState<UserState['me']>();

    const user = useAppSelector(selectValue);
    const currentUserInfo = useAppSelector(selectMe);
    const status = useAppSelector(selectUserStatus);

    const localuser = localStorage.getItem('userTitle')
    const localcurrentUserInfo = localStorage.getItem('currentUser')

    useEffect(() => {
        // setLoading(true)
        if (user && currentUserInfo) {
            setUserTitle(user)
            setCurrentUser(currentUserInfo)
            localStorage.setItem('userTitle', JSON.stringify(user));
            localStorage.setItem('currentUser', JSON.stringify(currentUserInfo));
        } else {
            localuser && setUserTitle(JSON.parse(localuser));
            localcurrentUserInfo && setCurrentUser(JSON.parse(localcurrentUserInfo));
        }
        // setLoading(false)
    }, [user, currentUserInfo, localuser, localcurrentUserInfo]);

    return (
        <div>
            {status === 'loading' && (
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
            {status === 'idle' && currentUser && userTitle && (
                userTitle === "student"
                    ? (
                        <StudentDetail />
                    )
                    : (userTitle === "tutor"
                        ? ( <TutorDetail />
                        )
                        : ( <AdminDetail />
                        )
                    )
            )}
        </div>
    )
}
export default UserData