import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Navigate, Redirect, Routes } from 'react-router-dom';
import { DefaultLayout } from '../../layout/DefaultLayout';
import { loginSuccess } from '../login/loginSlice';
import { fetchNewAccessJWT } from '../../api/userApi';
import { getUserProfile } from '../../pages/dashboard/userAction';
import { Entry } from '../../pages/entry/Entry.page';

export const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(loginSuccess());
    };

    !user._id && dispatch(getUserProfile());

    !sessionStorage.getItem('accessJWT') &&
      localStorage.getItem('crmSite') &&
      updateAccessJWT();

    !isAuth && sessionStorage.getItem('accessJWT') && dispatch(loginSuccess());
  }, [dispatch, isAuth, user._id]);

  if (!isAuth) {
    // console.log('hello');
    // return (
    <Routes>
      <Route path="/" element={<Entry />} />
    </Routes>;
    // );
    // return
  }
  return <DefaultLayout>{children}</DefaultLayout>;
};
