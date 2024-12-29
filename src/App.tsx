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
import AddCar from "./pages/AddCar";
import Calendar from "./pages/Calendar";
import Bookings from "./pages/Bookings";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard/*" element={<DashboardLayout />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </Router>
);

export default App;
