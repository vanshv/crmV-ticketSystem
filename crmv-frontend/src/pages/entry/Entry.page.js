import React, {useState} from "react"
import {LoginForm} from "../../components/login/login.comp.js";
import "./entry.style.css";
import { Container } from "react-bootstrap";
import { ResetPassword } from "../../components/password reset/PasswordReset.comp.js";

export const Entry = () => {
    console.log('entry');

    const [frmLoad, setFrmLoad] = useState("login");

    const handleOnResetSubmit = (e) => {
        e.preventDefault()
    };

    const formSwitcher = frmType =>{
        setFrmLoad(frmType);
    }

    return <div className="entry-page bg-info">
        <Container className="container-fluid bg-light p-5 form-box">
            {frmLoad === "login" && <LoginForm formSwitcher={formSwitcher}/>}

            {frmLoad === 'Reset' && <ResetPassword 
                // handleOnChange={handleOnChange}
                handleOnResetSubmit={handleOnResetSubmit}
                formSwitcher={formSwitcher}
                // email={email}
            />}
        </Container>
    </div>;
};