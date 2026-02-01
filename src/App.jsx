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

// Provider
import AuthProvider from "@/context/provider/AuthProvider";
import ExercisesProvider from "@/context/provider/ExercisesProvider";
import ModalProvider from "@/context/provider/ModalProvider";
function App() {
  return (
    <div className="App">
      <div className="container-fluid px-0">
        <BrowserRouter>
          <AuthProvider>
            <ExercisesProvider>
              <ModalProvider>
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
                    <Route path="/workout-plan" element={<WorkoutPlan />} />
                  </Route>
                </Routes>
              </ModalProvider>
            </ExercisesProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
