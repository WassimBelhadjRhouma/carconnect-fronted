import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;