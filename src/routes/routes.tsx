import { ReactElement } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import Login from "../pages/Login";
import SignUp from "../pages/signup";
import CarOwnershipVerification from "../pages/admin/CarOwnershipVerification";
import DrivingLicenceVerif from "../pages/admin/DrivingLicenceVerif";

export const PATHS = {
  public: {
    SIGNIN: "/signin",
    SIGNUP: "/signup",
  },
  private: {
    DASHBOARD: "/dashboard/*",
    verif_licence: "/dashboard/verify/cars",
    verif_ownership: "/dashboard/verify/drivinglicence",
  },
};

export interface RouteConfig {
  path: string;
  element: ReactElement;
  isProtected: Boolean;
  isPublic?: Boolean;
  isAdmin?: boolean;
}

export const APP_ROUTES: RouteConfig[] = [
  {
    path: PATHS.public.SIGNIN,
    element: <Login />,
    isPublic: true,
    isProtected: false,
  },
  {
    path: PATHS.public.SIGNUP,
    element: <SignUp />,
    isPublic: true,
    isProtected: false,
  },
  {
    path: PATHS.private.DASHBOARD,
    element: <DashboardLayout />,
    isProtected: true,
  },
  {
    path: PATHS.private.verif_licence,
    element: <DrivingLicenceVerif />,
    isProtected: true,
    isAdmin: true,
  },
  {
    path: PATHS.private.verif_ownership,
    element: <CarOwnershipVerification />,
    isProtected: true,
    isAdmin: true,
  },
];
