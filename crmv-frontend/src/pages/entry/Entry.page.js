import React, {useState} from "react"
import {LoginForm} from "../../components/login/login.comp.js";
import "./entry.style.css";
import { Container } from "react-bootstrap";

export const Entry = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnChange = e =>{
        const {name, value} = e.target
        console.log(name, value)
    };

    return <div className="entry-page bg-info">
        <Container className="container-fluid bg-light p-5 form-box">
            <LoginForm handleOnChange={handleOnChange}
            email={email}
            pass={password}
            />
        </Container>
    </div>;
};