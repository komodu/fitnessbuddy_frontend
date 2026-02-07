import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WorkoutPlan from "./pages/WorkoutPlan";
//Components
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import UserProfile from "./pages/UserProfile";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";
// Provider
import AuthProvider from "@/context/provider/AuthProvider";
import ExercisesProvider from "@/context/provider/ExercisesProvider";
import ModalProvider from "@/context/provider/ModalProvider";
import CurrentProvider from "./context/provider/CurrentProvider";
function App() {
  return (
    <div className="App">
      <div className="container-fluid px-0">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes (login, register) */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Private / App routes (dashboard, settings, etc.) */}
              <Route element={<ProtectedRoute />}>
                <Route
                  element={
                    <ExercisesProvider>
                      <CurrentProvider>
                        <ModalProvider>
                          <AppLayout />
                        </ModalProvider>
                      </CurrentProvider>
                    </ExercisesProvider>
                  }
                >
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/exercise" element={<Home />} />
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="/workout-plan" element={<WorkoutPlan />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
