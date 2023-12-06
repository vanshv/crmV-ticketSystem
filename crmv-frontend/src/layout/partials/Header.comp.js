import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/logo.jpg'
import {Link,  useNavigate} from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

export const Header = () => {
    const history = useNavigate();

    const logMeOut = () =>{
        history.push('/');
    };

    return (
    <Navbar 
        collapseOnSelect
        bg="info"
        variant="dark"
        expand="md"
    >
        <Navbar.Brand>
            <img src={logo} alt="logo" width="100px"/>
        </Navbar.Brand>
        <Navbar.Toggle
        aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <LinkContainer to='/dashboard'>
                    <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/tickets'>
                    <Nav.Link>Tickets</Nav.Link>
                </LinkContainer>

                <Nav.Link onClick={logMeOut}>Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
}