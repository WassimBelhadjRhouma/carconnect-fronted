import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
