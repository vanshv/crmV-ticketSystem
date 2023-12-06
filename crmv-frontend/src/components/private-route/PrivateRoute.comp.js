import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import { DefaultLayout } from '../../layout/DefaultLayout';

const isAuth = true;
// to implement when backend is done
export const PrivateRoute = ({children, ...rest}) => {
    return (
        <Routes>
            <Route
                {...rest}
                element={() =>
                    isAuth ? 
                        <DefaultLayout>{children}</DefaultLayout> : 
                        <Navigate to='/'/>
                }
            />  
        </Routes>
    );
};