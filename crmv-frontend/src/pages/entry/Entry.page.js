import React, {useState} from "react"
import { LoginForm } from "../../components/login/login.comp.js";
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
        <Container className='form-box' style={{ maxWidth: '500px' }}>
            {frmLoad === "login" && <LoginForm formSwitcher={formSwitcher}/>}
            {frmLoad === 'Reset' && <ResetPassword 
                handleOnResetSubmit={handleOnResetSubmit}
                formSwitcher={formSwitcher}
            />}
        </Container>
    </div>;
};