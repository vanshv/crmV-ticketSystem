import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import { DefaultLayout } from '../../layout/DefaultLayout';

const isAuth = true;
// to implement when backend is done
export const PrivateRoute = ({children, ...rest}) => {
    console.log(children, isAuth);
    return (
        <Route
            {...rest}
            render={() =>
                isAuth ? 
                    <DefaultLayout>{children}</DefaultLayout> : 
                    <Navigate to="/"/>
            }
        />  
    );
};