import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Spinner,
  Image,
} from "react-bootstrap";

import "../../commonStyle/style.scss";
import { format } from "date-fns";

import { useAppSelector } from '../../app/hooks';
import { LoginState, selectValue } from "../login/loginSlice";
import { selectMe, UserState } from "../user/userSlice";
import ProfileUpdate from "../user/ProfileUpdate";
import { selectErrorMessage } from "../user/userSlice";

const StudentDetail = () => {
  const [loading, setLoading] = useState(false);

  const [userTitle, setUserTitle] = useState<LoginState['value']>();
  const [currentUser, setCurrentUser] = useState<UserState['me']>();

  const user = useAppSelector(selectValue);
  const info = useAppSelector(selectMe);
  const errorMessage = useAppSelector(selectErrorMessage);

  useEffect(() => {
    setLoading(true)
    setUserTitle(user)
    setCurrentUser(info)

    if (currentUser?.firstname || errorMessage) {
      setLoading(false)
    }
  }, [currentUser, userTitle, user, info, errorMessage]);

  return (
    <>
      {loading && (
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
      {!loading && currentUser && (
        <>
          <Row className="mt-4 mb-2">
            <Col md={3} className="text-center mb-3">
              {currentUser && currentUser.image ? (
                <Image
                  src={currentUser.image}
                  className="img-fluid rounded-circle"
                  alt="profile"
                />
              ) : (
                  <Image
                    src="https://img.icons8.com/officel/2x/user.png"
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                )}
              <h3 className="mt-3 mb-0">
                {currentUser.firstname} {currentUser.lastname}
              </h3>
              <strong>{currentUser.email}</strong>
            </Col>
            <Col md={9} className="d-flex flex-column justify-content-center">
              <>
                <Table responsive="md">
                  <thead>
                    <tr className="app-table">
                      <th className="text-left">
                        Profile Detail
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="app-table">
                      <td>First Name</td>
                      <td>
                        <strong>{currentUser.firstname}</strong>
                      </td>
                    </tr>
                    <tr className="app-table">
                      <td>Last Name</td>
                      <td>
                        <strong>{currentUser.lastname}</strong>
                      </td>
                    </tr>
                    <tr className="app-table">
                      <td>Email</td>
                      <td>
                        <strong>{currentUser.email}</strong>
                      </td>
                    </tr>
                    <tr className="app-table">
                      <td>D.O.B</td>
                      <td>
                        <strong>
                          {currentUser.dateofbirth && format(
                            new Date(currentUser.dateofbirth),
                            "yyyy-MM-dd"
                          )}
                        </strong>
                      </td>
                    </tr>
                    <tr className="app-table">
                      <td>Nationality</td>
                      <td>
                        <strong>{currentUser.nationality}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <ProfileUpdate />
              </>
            </Col>
          </Row>
        </>
      )}
      {!loading && !currentUser && errorMessage && (
        <p className="text-center">
          <strong>Encountered problem while trying to load the page!</strong>
        </p>
      )}
    </>
  );
};

export default StudentDetail;
