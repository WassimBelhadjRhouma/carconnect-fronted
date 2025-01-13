import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PATHS } from "./routes";

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to={PATHS.private.DASHBOARD} />
  ) : (
    // <Navigate to={PATHS.private.ADMIN_CAR_VERIF} />
    children
  );
};

export default PublicRoute;
