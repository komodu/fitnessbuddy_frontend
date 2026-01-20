import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
//Components

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

// Context
import { ModalContextProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import { ExercisesContextProvider } from "./context/ExerciseContext";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <div className="App">
      <div className="container-fluid px-0">
        <AuthProvider>
          <BrowserRouter>
            <ExercisesContextProvider>
              <ModalContextProvider>
                <Routes>
                  {/* Public routes (login, register) */}
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>

                  {/* Private / App routes (dashboard, settings, etc.) */}
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/exercise" element={<Home />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                  </Route>
                </Routes>
              </ModalContextProvider>
            </ExercisesContextProvider>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
