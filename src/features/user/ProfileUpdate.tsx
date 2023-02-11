import React, { useState, FormEvent, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../../commonStyle/style.scss";
import TextModal from "../modal/TextModal";
import ImageModal from "../modal/ImageModal";

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { updateMeProfile, updateMeImage } from "../../actions/fetch_Me";
import { selectMe } from "./userSlice";

const ProfileUpdate = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectMe);
    // const localcurrent = localStorage.getItem('currentUser')
    // const currentUser = localcurrent && JSON.parse(localcurrent)

    const localuser = localStorage.getItem('userTitle')
    const userTitle = localuser && JSON.parse(localuser)

    const [profileText, setProfileText] = useState(false);
    const [profileImage, setProfileImage] = useState(false);
    const [image, setImage] = useState<File|string|Blob>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dateofbirth, setDateofbirth] = useState<string>('');
    const [nationality, setNationality] = useState<string>('');

    const saveImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFile = files as FileList;
        console.log('selectedFile?.[0] =', selectedFile?.[0])
        setImage(selectedFile?.[0])
    };

    const setModalForText = (value: boolean) => setProfileText(value);
    const setModalForImage = (value: boolean) => setProfileImage(value);
    const set_F_Name = (name: string) => setFirstname(name);
    const set_L_Name = (name: string) => setLastname(name);
    const set_Email = (text: string) => setEmail(text);
    const set_DOB = (value: string) => setDateofbirth(value);
    const set_Nationality = (value: string) => setNationality(value);

    const onProfileTextUpdate = (e: FormEvent) => {
        e.preventDefault();

        let data = {};

        if (userTitle === "student") {
            data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                dateofbirth: dateofbirth,
                nationality: nationality,
            };
        }
        else {
            data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
            };
        }
        dispatch(updateMeProfile(userTitle, data));
        setModalForText(false)
    }

    const onProfileImageUpdate = (e: FormEvent) => {
        e.preventDefault();
        console.log('image =', image)
        console.log('userTitle22 =', userTitle)

        dispatch(updateMeImage(userTitle, image));
        setModalForImage(false)
    };

    useEffect(() => {
        if (userTitle === "student") {
            setFirstname(user.firstname)
            setLastname(user.lastname)
            setDateofbirth(user.dateofbirth)
            setEmail(user.email)
            setNationality(user.nationality)
        } else {
            setFirstname(user.firstname)
            setLastname(user.lastname)
            setEmail(user.email)
        }
    }, [user, userTitle])

    return (
        <>
            <Button
                className="mb-1 btn-secondary"
                onClick={() => setProfileText(true)}
            >
                Update Account details
            </Button>{" "}

            <Button
                className="mb-1 btn-secondary"
                onClick={() => setProfileImage(true)}
            >
                Update Profile Image
            </Button>{" "}

            <TextModal
                userTitle={userTitle}
                profileText={profileText}
                setModalForText={setModalForText}
                updateProfileText={onProfileTextUpdate}
                firstname={firstname}
                set_F_Name={set_F_Name}
                lastname={lastname}
                set_L_Name={set_L_Name}
                email={email}
                set_Email={set_Email}
                dob={dateofbirth}
                set_DOB={set_DOB}
                nationality={nationality}
                set_Nationality={set_Nationality}
            />
            <ImageModal
                profileImage={profileImage}
                setModalForImage={setModalForImage}
                updateProfileImage={onProfileImageUpdate}
                saveImg={saveImg}
            />
        </>
    );
};

export default ProfileUpdate;
