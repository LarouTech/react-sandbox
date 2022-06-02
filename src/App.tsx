import React, { useEffect, useState } from 'react';
import { Home } from './Home/Home';
import './App.module.scss';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Lobby } from './Lobby/Lobby';
import jwtDecode from 'jwt-decode';
import { AuthProvider } from './Home/AuthCard/AuthProvider';
import {
  AuthContextProps,
  intitAuthContext
} from './Home/AuthCard/AuthContext';
import {
  isAuth,
  IsAuthenticatedGuard,
  RequireAuthGuard
} from './Home/AuthCard/AuthGuards';

export const App = (): JSX.Element => {
  const [authState, setAuthState] =
    useState<AuthContextProps>(intitAuthContext);

  useEffect(() => {
    if (localStorage.getItem('AccessToken')) {
      const decoded: any = jwtDecode(localStorage.getItem('AccessToken')!);

      setAuthState({
        ...intitAuthContext,
        email: decoded['username'],
        sub: decoded['sub'],
        isAuth: isAuth(localStorage.getItem('AccessToken')!)
      });
    } else {
      setAuthState(intitAuthContext);
    }
  }, [setAuthState]);

  const onSetAuthState = () => {
    setAuthState(intitAuthContext);
  };
""
  const onGetAuthStateHandler = (context: AuthContextProps): void => {
    setAuthState(context);
  };

  return (
    <AuthProvider state={{ ...authState, setAuthState: onSetAuthState }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <IsAuthenticatedGuard>
                <Home getAuthState={onGetAuthStateHandler}></Home>
              </IsAuthenticatedGuard>
            }
          ></Route>
          <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
          <Route
            path="/lobby"
            element={
              <RequireAuthGuard>
                <Lobby></Lobby>
              </RequireAuthGuard>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
