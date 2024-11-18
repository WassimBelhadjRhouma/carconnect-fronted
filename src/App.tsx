import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import DashboardLayout from "./pages/DashboardLayout";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/dashboard/*" element={<DashboardLayout />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
        {/* Dashboard Routes */}
    </Routes>
  </Router>
);

export default App;
