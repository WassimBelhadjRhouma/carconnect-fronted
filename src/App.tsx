import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes></AppRoutes>
      </Router>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
