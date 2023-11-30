import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/logo.jpg'

export const Header = () => {
    return <Navbar 
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
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/dashboard">Tickets</Nav.Link>
                <Nav.Link href="/dashboard">Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}