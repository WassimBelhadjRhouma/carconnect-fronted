import { ReactElement } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import Login from "../pages/Login";
import SignUp from "../pages/signup";

export const PATHS = {
  public: {
    SIGNIN: "/signin",
    SIGNUP: "/signup",
  },
  private: {
    DASHBOARD: "/dashboard/*"
  },
};

export interface RouteConfig {
  path: string;
  element: ReactElement;
  isProtected: Boolean;
  isPublic?: Boolean;
  }
  
  export const APP_ROUTES: RouteConfig[] = [
    { path: PATHS.public.SIGNIN, element: <Login />,isPublic: true, isProtected: false },
    { path: PATHS.public.SIGNUP, element: <SignUp />,isPublic: true, isProtected: false },
    { path: PATHS.private.DASHBOARD, element: <DashboardLayout />, isProtected: true },
  ];


