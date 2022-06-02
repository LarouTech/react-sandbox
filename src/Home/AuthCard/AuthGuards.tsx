import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

//Auth guard
export const RequireAuthGuard = ({ children }: { children: JSX.Element }) => {
    let auth = useContext(AuthContext);
    let location = useLocation();
  
    if (!auth.isAuth) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  };
  
  //is auth guard
  export const IsAuthenticatedGuard = ({
    children
  }: {
    children: JSX.Element;
  }) => {
    let auth = useContext(AuthContext);
    let location = useLocation();
  
    if (auth.isAuth) {
      return <Navigate to="/lobby" state={{ from: location }} replace />;
    }
  
    return children;
  };
  
  //function that return isAuth boealan
  export const isAuth = (accessToken: string): boolean => {
    const decoded: any = jwtDecode(accessToken);
    const now = Math.round(Date.now() / 1000);
    const alive = decoded['exp'] - now;
  
    console.log(alive);
  
    if (alive > 0) {
      return true;
    }
  
    return false;
  };