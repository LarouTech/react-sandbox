import jwtDecode from 'jwt-decode';
import { createContext, useEffect } from 'react';
import { isAuth } from './AuthGuards';

export interface AppCognitoConfig {
  region: string;
  poolID?: string;
  clientId: string;
  callbackRoute?: string;
  rootRoute?: string;
}

export interface AuthContextProps {
  email: string;
  sub: string;
  isAuth: boolean;
  setAuthState?: any;
  cognito?: AppCognitoConfig;
}

//intial auth context value
export const intitAuthContext: AuthContextProps = {
  email: null!,
  sub: null!,
  isAuth: false,
};

//create auth context
export const AuthContext = createContext(intitAuthContext);

export const AuthContextEffect = (
  state: AuthContextProps,
  setState: (value: React.SetStateAction<AuthContextProps>) => void
) => {
  return useEffect(() => {
    if (localStorage.getItem('AccessToken')) {
      const decoded: any = jwtDecode(localStorage.getItem('AccessToken')!);

      setState({
        ...intitAuthContext,
        email: decoded['username'],
        sub: decoded['sub'],
        isAuth: isAuth(localStorage.getItem('AccessToken')!)
      });
    } else {
      setState(intitAuthContext);
    }
  }, [state, setState]);
};
