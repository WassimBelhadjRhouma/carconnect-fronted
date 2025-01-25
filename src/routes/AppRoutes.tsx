import { Routes, Route, Navigate } from "react-router-dom";
import { APP_ROUTES, PATHS } from "./routes";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";

const AppRoutes: React.FC = () => (
  <Routes>
    {APP_ROUTES.map(({ path, element, isProtected, isPublic, isAdmin }) => (
      <Route
        key={path}
        path={path}
        element={
          isProtected ? (
            <ProtectedRoute>{element}</ProtectedRoute>
          ) : isPublic ? (
            <PublicRoute>{element}</PublicRoute>
          ) : (
            element
          )
        }
      />
    ))}
    <Route path="/" element={<Navigate to={PATHS.public.SIGNIN} />} />
    <Route path="*" element={<h1>Page Not Found</h1>} />
  </Routes>
);

export default AppRoutes;
