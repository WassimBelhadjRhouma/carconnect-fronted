import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { USER_TYPES } from "../interfaces/AuthInterfaces";

const OnlyAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" />;

  return role == USER_TYPES.ADMIN ? children : <Navigate to="/dashboard" />;
};

export default OnlyAdmin;
