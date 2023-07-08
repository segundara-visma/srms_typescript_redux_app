import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, Container, NavDropdown, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "../../commonStyle/style.scss";
import { selectMe, UserState } from '../user/userSlice';
import { useAppSelector } from '../../app/hooks'

const NavBar = () => {
    const meInfo = useAppSelector(selectMe)
    const [currentUserInfo, setCurrentUserInfo] = useState<UserState['me']>(meInfo)
    const location = useLocation();

    const loggedInTitle = localStorage.getItem("userTitle");

    useEffect(() => {

        const localcurrent = localStorage.getItem('currentUser')
        if (localcurrent) {
            const currentUser = JSON.parse(localcurrent)
            setCurrentUserInfo(currentUser)
        }
    }, [meInfo])

    const img = () => {
        return currentUserInfo && currentUserInfo.image ?
            <Image
              src={currentUserInfo.image}
              className="img-fluid rounded-circle nav-user-image"
              alt="profile"
            />
          : <Image
                src="https://img.icons8.com/officel/2x/user.png"
                className="img-fluid rounded-circle nav-user-image"
                alt="profile"
            />
    }

    return (
        <Container fluid className="nav-container">
            <Navbar collapseOnSelect expand="md" variant="dark" className="rounded nav-content">
                <Navbar.Brand>
                    SCHOOL RECORD SYSTEM
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="loginBtn">
                        {!loggedInTitle
                            ? (<span>
                                <Nav className="mr-auto shadow-lg" navbar style={{ cursor: 'pointer' }}>
                                    <NavItem className="appLink">
                                        <Link to="/login"
                                            className={
                                                location.pathname === '/login'
                                                    ? "nav-link active"
                                                    : "nav-link"
                                            }>
                                            Login
                                            </Link>
                                    </NavItem>
                                </Nav>
                            </span>)
                            : (
                                <>
                                    {img()}
                                    <NavDropdown
                                        className='nav-user'
                                        title={currentUserInfo && `Welcome ${currentUserInfo.firstname} ${currentUserInfo.lastname}`}
                                        id="basic-nav-dropdown">
                                        {location.pathname === '/profile' ? <NavDropdown.Item className='activeDropdown' href="/profile">My account</NavDropdown.Item> : <NavDropdown.Item href="/profile">My account</NavDropdown.Item>}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/logout">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}


export default NavBar;
