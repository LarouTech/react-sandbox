import { AuthContext, AuthContextProps } from "./AuthContext";

export interface AuthProviderProps {
    children: JSX.Element;
    state: AuthContextProps;
  }
  
  export const AuthProvider = (props: AuthProviderProps) => {
    return (
      <AuthContext.Provider value={props.state}>
        {props.children}
      </AuthContext.Provider>
    );
  };