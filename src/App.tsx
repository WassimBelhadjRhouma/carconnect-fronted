import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";


const App: React.FC = () => (
  <AuthProvider>
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/dashboard/*" element={<DashboardLayout />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </Router>
  </AuthProvider>
);

export default App;
