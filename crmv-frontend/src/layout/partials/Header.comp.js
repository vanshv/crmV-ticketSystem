import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/logo192.png';
import { useNavigate, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { userLogout } from '../../api/userApi';

export const Header = () => {
  const navigate = useNavigate();
  const logMeOut = () => {
    userLogout();
    sessionStorage.removeItem('accessJWT');
    localStorage.removeItem('crmSite');
    console.log('before bug');
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand>
        <img src={logo} alt="logo" width="100px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <LinkContainer to="/dashboard">
            <Nav.Link color="red">Dashboard</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/tickets">
            <Nav.Link>Tickets</Nav.Link>
          </LinkContainer>

          <Nav.Link onClick={logMeOut}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
