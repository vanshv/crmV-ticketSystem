import React, {useState} from "react"
import {LoginForm} from "../../components/login/login.comp.js";
import "./entry.style.css";
import { Container } from "react-bootstrap";
import { ResetPassword } from "../../components/password reset/PasswordReset.comp.js";

export const Entry = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [frmLoad, setFrmLoad] = useState("Login");


    const handleOnChange = e =>{
        const {name, value} = e.target
        
        switch(name){
            case 'email':
                setEmail(value)
                break;
            
            case 'password':
                setPassword(value)
                break;

            default:
                break;
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if(!email || !password){
            return alert("Fill up all the form!");
        }

        console.log(email, password);
    };

    const handleOnResetSubmit = (e) => {
        e.preventDefault()

        if(!email){
            return alert("Please enter the email!");
        }

        console.log(email);
    };

    const formSwitcher = frmType =>{
        setFrmLoad(frmType);
    }

    return <div className="entry-page bg-info">
        <Container className="container-fluid bg-light p-5 form-box">
            {frmLoad === 'Login' && <LoginForm 
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            formSwitcher={formSwitcher}
            email={email}
            pass={password}
            />}

            {frmLoad === 'Reset' && <ResetPassword 
            handleOnChange={handleOnChange}
            handleOnResetSubmit={handleOnResetSubmit}
            formSwitcher={formSwitcher}
            email={email}
            pass={password}
            />}
        </Container>
    </div>;
};