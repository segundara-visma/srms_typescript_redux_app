import React, { useState, useEffect } from 'react';
import "../../commonStyle/style.scss";

import { LoginState } from '../login/loginSlice';
import StudentDetail from '../student/Student';
import TutorDetail from '../tutor/Tutor';
import AdminDetail from '../admin/Admin';

const UserData = () => {
    const [userTitle, setUserTitle] = useState<LoginState['value']>();
    const localuser = localStorage.getItem('userTitle')

    useEffect(() => {
        localuser && setUserTitle(JSON.parse(localuser));
    }, [localuser]);

    return (
        <div>
            {userTitle && (
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